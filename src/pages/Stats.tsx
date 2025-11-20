import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface StatsData {
  total: number;
  interest: Record<string, number>;
  knowledge: Record<string, number>;
  career: Record<string, number>;
  fears: Record<string, number>;
  future_contribution: Record<string, number>;
  innovation: Record<string, number>;
  opinion: Record<string, number>;
  age_distribution: Record<string, number>;
}

const Stats = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://functions.poehali.dev/6a07e091-348c-42c5-8c5b-91364fb1aa03')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching stats:', error);
        setLoading(false);
      });
  }, []);

  const getPercentage = (count: number, total: number) => {
    return total > 0 ? Math.round((count / total) * 100) : 0;
  };

  const translateLabel = (key: string, value: string): string => {
    const translations: Record<string, Record<string, string>> = {
      interest: {
        very: 'Очень интересует',
        somewhat: 'Скорее интересует',
        neutral: 'Нейтрально',
        not_much: 'Мало интересует'
      },
      knowledge: {
        expert: 'Хорошо знаком',
        basic: 'Базовые знания',
        little: 'Знаю мало',
        none: 'Не знаком'
      },
      career: {
        yes: 'Да, серьёзно рассматриваю',
        maybe: 'Возможно, в будущем',
        unsure: 'Пока не уверен',
        no: 'Нет, не рассматриваю'
      },
      fears: {
        difficulty: 'Сложность обучения',
        competition: 'Высокая конкуренция',
        salary: 'Заработная плата',
        responsibility: 'Высокая ответственность',
        no_fears: 'Нет сомнений'
      },
      future_contribution: {
        engineer: 'Инженером на производстве',
        designer: 'Конструктором новых проектов',
        researcher: 'Исследователем новых технологий',
        manager: 'Руководителем проектов',
        unsure: 'Пока не определился'
      },
      innovation: {
        yes_dream: 'Да, это моя мечта',
        yes_interesting: 'Да, было бы интересно',
        prefer_existing: 'Предпочитаю работу с существующими',
        no: 'Нет, не интересует'
      },
      opinion: {
        prestigious: 'Престижная и перспективная',
        interesting: 'Интересная и творческая',
        difficult: 'Сложная, но важная',
        patriotic: 'Важна для страны',
        neutral: 'Обычная профессия'
      },
      age_distribution: {
        under_14: 'До 14 лет',
        '14-17': '14-17 лет',
        '18-22': '18-22 года',
        over_22: 'Старше 22 лет'
      }
    };
    return translations[key]?.[value] || value;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50">
        <div className="text-center">
          <Icon name="Loader2" size={48} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-gray-600">Загрузка статистики...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50">
        <div className="text-center">
          <Icon name="AlertCircle" size={48} className="text-red-500 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Ошибка загрузки данных</p>
        </div>
      </div>
    );
  }

  const statSections = [
    { key: 'interest', title: 'Интерес к профессии', icon: 'Heart' },
    { key: 'knowledge', title: 'Уровень знаний', icon: 'BookOpen' },
    { key: 'career', title: 'Карьерные планы', icon: 'Briefcase' },
    { key: 'fears', title: 'Опасения и сомнения', icon: 'AlertTriangle' },
    { key: 'future_contribution', title: 'Видение через 5 лет', icon: 'Target' },
    { key: 'innovation', title: 'Интерес к инновациям', icon: 'Lightbulb' },
    { key: 'opinion', title: 'Мнение о профессии', icon: 'MessageSquare' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Plane" size={28} className="text-primary" />
              <span className="text-xl font-bold text-secondary">АвиаКарьера</span>
            </div>
            <Button onClick={() => navigate('/')} variant="outline">
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              На главную
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-secondary mb-4">Статистика опроса</h1>
          <p className="text-xl text-gray-600">
            Проанализировано ответов: <span className="font-bold text-primary">{stats.total}</span>
          </p>
        </div>

        <div className="mb-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Users" className="text-primary" />
                Возрастное распределение
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(stats.age_distribution).map(([age, count]) => (
                  <div key={age}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{translateLabel('age_distribution', age)}</span>
                      <span className="text-sm font-bold text-primary">
                        {count} ({getPercentage(count, stats.total)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-primary h-3 rounded-full transition-all duration-500"
                        style={{ width: `${getPercentage(count, stats.total)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {statSections.map((section) => {
            const data = stats[section.key as keyof StatsData] as Record<string, number>;
            if (!data || Object.keys(data).length === 0) return null;

            return (
              <Card key={section.key} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name={section.icon} className="text-primary" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(data)
                      .sort(([, a], [, b]) => b - a)
                      .map(([value, count]) => (
                        <div key={value}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              {translateLabel(section.key, value)}
                            </span>
                            <span className="text-sm font-bold text-primary">
                              {count} ({getPercentage(count, stats.total)}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-gradient-to-r from-primary to-blue-400 h-2.5 rounded-full transition-all duration-500"
                              style={{ width: `${getPercentage(count, stats.total)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Card className="inline-block shadow-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <CardContent className="pt-6">
              <Icon name="TrendingUp" size={48} className="mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Данные обновляются в реальном времени</h3>
              <p className="text-white/80">
                Статистика основана на ответах школьников и студентов из Ульяновска
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="bg-secondary text-white py-8 px-4 mt-12">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Plane" size={24} />
            <span className="text-lg font-bold">АвиаКарьера</span>
          </div>
          <p className="text-white/70">
            © 2024 АвиаКарьера. Образовательный проект о профессии авиастроителя
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Stats;
