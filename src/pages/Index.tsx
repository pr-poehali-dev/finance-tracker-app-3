import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Account {
  id: string;
  name: string;
  balance: number;
  currency: string;
  type: string;
  color: string;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  account: string;
}

interface Budget {
  category: string;
  spent: number;
  limit: number;
  color: string;
}

export default function Index() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const accounts: Account[] = [
    { id: '1', name: 'Основной счёт', balance: 125840.50, currency: 'RUB', type: 'Дебетовая карта', color: '#0EA5E9' },
    { id: '2', name: 'Накопления', balance: 450000, currency: 'RUB', type: 'Сберегательный счёт', color: '#10B981' },
    { id: '3', name: 'USD счёт', balance: 5240.80, currency: 'USD', type: 'Валютный счёт', color: '#F59E0B' },
  ];

  const exchangeRates = {
    USD: 95.50,
    EUR: 103.20,
  };

  const totalBalanceRub = accounts.reduce((sum, acc) => {
    if (acc.currency === 'USD') {
      return sum + acc.balance * exchangeRates.USD;
    }
    return sum + acc.balance;
  }, 0);

  const transactions: Transaction[] = [
    { id: '1', date: '2025-01-20', description: 'Продуктовый магазин', category: 'Продукты', amount: -3500, type: 'expense', account: 'Основной счёт' },
    { id: '2', date: '2025-01-19', description: 'Зарплата', category: 'Доход', amount: 85000, type: 'income', account: 'Основной счёт' },
    { id: '3', date: '2025-01-18', description: 'Кафе', category: 'Рестораны', amount: -1200, type: 'expense', account: 'Основной счёт' },
    { id: '4', date: '2025-01-17', description: 'Транспорт', category: 'Транспорт', amount: -850, type: 'expense', account: 'Основной счёт' },
    { id: '5', date: '2025-01-16', description: 'Аптека', category: 'Здоровье', amount: -2400, type: 'expense', account: 'Основной счёт' },
    { id: '6', date: '2025-01-15', description: 'Netflix', category: 'Подписки', amount: -799, type: 'expense', account: 'Основной счёт' },
  ];

  const budgets: Budget[] = [
    { category: 'Продукты', spent: 18500, limit: 25000, color: '#0EA5E9' },
    { category: 'Транспорт', spent: 4200, limit: 8000, color: '#10B981' },
    { category: 'Рестораны', spent: 7800, limit: 10000, color: '#F59E0B' },
    { category: 'Развлечения', spent: 3500, limit: 5000, color: '#8B5CF6' },
  ];

  const expensesByCategory = [
    { name: 'Продукты', value: 18500, color: '#0EA5E9' },
    { name: 'Транспорт', value: 4200, color: '#10B981' },
    { name: 'Рестораны', value: 7800, color: '#F59E0B' },
    { name: 'Развлечения', value: 3500, color: '#8B5CF6' },
    { name: 'Здоровье', value: 2400, color: '#EF4444' },
    { name: 'Подписки', value: 799, color: '#EC4899' },
  ];

  const monthlyData = [
    { month: 'Авг', income: 85000, expenses: 42000 },
    { month: 'Сен', income: 88000, expenses: 45000 },
    { month: 'Окт', income: 85000, expenses: 38000 },
    { month: 'Ноя', income: 90000, expenses: 48000 },
    { month: 'Дек', income: 95000, expenses: 52000 },
    { month: 'Янв', income: 85000, expenses: 37199 },
  ];

  const formatCurrency = (amount: number, currency: string = 'RUB') => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <Icon name="Wallet" className="text-accent-foreground" size={24} />
              </div>
              <h1 className="text-2xl font-bold">FinanceTracker</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Icon name="Settings" size={18} />
              </Button>
              <Button variant="default" size="sm">
                <Icon name="Plus" size={18} className="mr-2" />
                Добавить
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Icon name="LayoutDashboard" size={16} />
              <span className="hidden sm:inline">Обзор</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <Icon name="ArrowLeftRight" size={16} />
              <span className="hidden sm:inline">Транзакции</span>
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex items-center gap-2">
              <Icon name="PiggyBank" size={16} />
              <span className="hidden sm:inline">Бюджет</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <Icon name="BarChart3" size={16} />
              <span className="hidden sm:inline">Отчёты</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
            <Card className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground border-0">
              <CardHeader>
                <CardTitle className="text-lg font-medium opacity-90">Общий баланс</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-4">{formatCurrency(totalBalanceRub)}</div>
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <Icon name="TrendingUp" size={16} />
                  <span>+12.5% к прошлому месяцу</span>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              {accounts.map((account) => (
                <Card key={account.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-semibold">{account.name}</CardTitle>
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: account.color }}></div>
                    </div>
                    <p className="text-sm text-muted-foreground">{account.type}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(account.balance, account.currency)}</div>
                    {account.currency !== 'RUB' && (
                      <p className="text-sm text-muted-foreground mt-1">
                        ≈ {formatCurrency(account.balance * exchangeRates[account.currency as keyof typeof exchangeRates])}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={20} />
                    Доходы и расходы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Area type="monotone" dataKey="income" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
                      <Area type="monotone" dataKey="expenses" stroke="#EF4444" fill="#EF4444" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="PieChart" size={20} />
                    Структура расходов
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={expensesByCategory}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {expensesByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {expensesByCategory.map((item) => (
                      <div key={item.name} className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-muted-foreground">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Clock" size={20} />
                  Последние транзакции
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-72">
                  <div className="space-y-3">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/5 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                            }`}
                          >
                            <Icon
                              name={transaction.type === 'income' ? 'TrendingUp' : 'TrendingDown'}
                              className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}
                              size={20}
                            />
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-muted-foreground">{transaction.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-semibold ${
                              transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {transaction.amount > 0 ? '+' : ''}
                            {formatCurrency(transaction.amount)}
                          </p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="List" size={20} />
                    Все транзакции
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Icon name="Filter" size={16} className="mr-2" />
                      Фильтры
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Download" size={16} className="mr-2" />
                      Экспорт
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-2">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/5 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                            }`}
                          >
                            <Icon
                              name={transaction.type === 'income' ? 'ArrowDown' : 'ArrowUp'}
                              className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}
                              size={20}
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-base">{transaction.description}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {transaction.category}
                              </Badge>
                              <span className="text-sm text-muted-foreground">{transaction.account}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-xl font-bold ${
                              transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {transaction.amount > 0 ? '+' : ''}
                            {formatCurrency(transaction.amount)}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">{transaction.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget" className="space-y-6 animate-fade-in">
            <div className="grid gap-4">
              {budgets.map((budget) => {
                const percentage = (budget.spent / budget.limit) * 100;
                const isOverBudget = percentage > 100;

                return (
                  <Card key={budget.category}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{budget.category}</CardTitle>
                        <Badge variant={isOverBudget ? 'destructive' : 'secondary'}>
                          {percentage.toFixed(0)}%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Потрачено</span>
                        <span className="font-semibold">{formatCurrency(budget.spent)}</span>
                      </div>
                      <Progress value={Math.min(percentage, 100)} className="h-3" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Лимит</span>
                        <span className="font-semibold">{formatCurrency(budget.limit)}</span>
                      </div>
                      {isOverBudget && (
                        <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-2 rounded">
                          <Icon name="AlertCircle" size={16} />
                          <span>Превышен лимит на {formatCurrency(budget.spent - budget.limit)}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Общий доход</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{formatCurrency(85000)}</div>
                  <p className="text-sm text-muted-foreground mt-1">Январь 2025</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Общие расходы</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">{formatCurrency(37199)}</div>
                  <p className="text-sm text-muted-foreground mt-1">Январь 2025</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Накопления</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-accent">{formatCurrency(47801)}</div>
                  <p className="text-sm text-muted-foreground mt-1">За январь</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BarChart3" size={20} />
                  Динамика за 6 месяцев
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" fill="#10B981" name="Доходы" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="expenses" fill="#EF4444" name="Расходы" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="LineChart" size={20} />
                  Чистая прибыль
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData.map(d => ({ ...d, profit: d.income - d.expenses }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Line type="monotone" dataKey="profit" stroke="#0EA5E9" strokeWidth={3} name="Чистая прибыль" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}