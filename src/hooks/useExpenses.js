import { useCallback, useEffect, useMemo, useState } from 'react';
import * as api from '../services/api';

const sampleExpenses = [
  { id: '1', title: 'Coffee', category: 'Food', amount: 6.5, date: '2026-05-12', notes: 'Morning latte' },
  { id: '2', title: 'Electricity bill', category: 'Utilities', amount: 72.0, date: '2026-05-09', notes: 'Monthly payment' },
  { id: '3', title: 'Groceries', category: 'Food', amount: 145.25, date: '2026-05-08', notes: 'Weekly market run' },
  { id: '4', title: 'Streaming', category: 'Entertainment', amount: 12.99, date: '2026-05-06', notes: 'Subscriptions' },
  { id: '5', title: 'Fuel', category: 'Transport', amount: 38.0, date: '2026-05-04', notes: 'Gas station' },
];

const categoryPalette = {
  Food: '#2563EB',
  Utilities: '#14B8A6',
  Entertainment: '#F59E0B',
  Transport: '#8B5CF6',
  Savings: '#0EA5E9',
  Other: '#64748B',
};

const formatDateKey = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [backendStats, setBackendStats] = useState(null);

  const refreshExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [expensesData, analyticsData] = await Promise.all([
        api.getExpenses(),
        api.getAnalytics()
      ]);
      setExpenses(Array.isArray(expensesData) ? expensesData : sampleExpenses);
      setBackendStats(analyticsData);
    } catch (err) {
      setError(err.message);
      setExpenses(sampleExpenses);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshExpenses();
  }, [refreshExpenses]);

  const addNewExpense = async (expense) => {
    setLoading(true);
    try {
      const added = await api.addExpense(expense);
      setExpenses((current) => [{ id: added?.id ?? Date.now().toString(), ...expense }, ...current]);
      // Refresh analytics after adding
      api.getAnalytics().then(setBackendStats).catch(console.error);
      return { success: true };
    } catch (err) {
      setError(err.message);
      setExpenses((current) => [{ id: Date.now().toString(), ...expense }, ...current]);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const removeExpense = async (id) => {
    setLoading(true);
    try {
      await api.deleteExpense(id);
      setExpenses((current) => current.filter((item) => item.id !== id));
      // Refresh analytics after deleting
      api.getAnalytics().then(setBackendStats).catch(console.error);
      return { success: true };
    } catch (err) {
      setError(err.message);
      setExpenses((current) => current.filter((item) => item.id !== id));
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    // Local fallback calculations
    const localTotal = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
    const localThisMonth = expenses
      .filter((item) => item.date.startsWith(new Date().toISOString().slice(0, 7)))
      .reduce((sum, item) => sum + Number(item.amount), 0);
    const localCategories = expenses.reduce((acc, item) => {
      const bucket = item.category || 'Other';
      acc[bucket] = (acc[bucket] || 0) + Number(item.amount);
      return acc;
    }, {});
    const localCategoryDistribution = Object.entries(localCategories).map(([name, value]) => ({ 
      name, 
      value, 
      color: categoryPalette[name] || categoryPalette.Other 
    }));
    const localMonthlyTrends = Object.entries(
      expenses.reduce((acc, item) => {
        const key = formatDateKey(item.date);
        acc[key] = (acc[key] || 0) + Number(item.amount);
        return acc;
      }, {})
    )
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, value]) => ({ month, value }));

    // Prefer backend stats if available
    return {
      total: backendStats?.total_expenses?.toFixed(2) ?? localTotal.toFixed(2),
      monthly: backendStats?.monthly_spending?.toFixed(2) ?? localThisMonth.toFixed(2),
      categoryDistribution: backendStats?.category_breakdown?.length 
        ? backendStats.category_breakdown.map(c => ({ ...c, color: categoryPalette[c.name] || categoryPalette.Other }))
        : localCategoryDistribution,
      monthlyTrends: localMonthlyTrends, // Trends are currently easier to calculate locally for responsiveness
      savings: (Math.max(0, 1200 - (backendStats?.total_expenses ?? localTotal))).toFixed(2),
      highestExpense: backendStats?.highest_expense ?? 0,
      transactionCount: backendStats?.transaction_count ?? expenses.length,
    };
  }, [expenses, backendStats]);

  return {
    expenses,
    loading,
    error,
    addExpense: addNewExpense,
    deleteExpense: removeExpense,
    refreshExpenses,
    stats,
  };
};
