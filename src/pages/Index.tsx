import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, string>>({});
  const [surveySubmitted, setSurveySubmitted] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSurveySubmit = async () => {
    if (Object.keys(surveyAnswers).length < 10) {
      toast.error('Пожалуйста, ответьте на все вопросы');
      return;
    }

    try {
      const response = await fetch('https://functions.poehali.dev/1458cc1a-d86d-4467-a314-fe933f128118', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyAnswers),
      });

      if (response.ok) {
        setSurveySubmitted(true);
        toast.success('Спасибо за участие в опросе!');
      } else {
        toast.error('Ошибка при отправке опроса');
      }
    } catch (error) {
      toast.error('Ошибка при отправке опроса');
    }
  };

  const textFields = [
    { id: 'name', label: 'Ваше имя', placeholder: 'Введите имя' },
    { id: 'age', label: 'Ваш возраст', placeholder: 'Введите возраст', type: 'number' },
    { id: 'institution', label: 'Место обучения', placeholder: 'Школа, колледж или вуз' }
  ];

  const surveyQuestions = [
    {
      id: 'interest',
      question: 'Насколько вас интересует профессия авиастроителя?',
      options: [
        { value: 'very', label: 'Очень интересует' },
        { value: 'somewhat', label: 'Скорее интересует' },
        { value: 'neutral', label: 'Нейтрально' },
        { value: 'not_much', label: 'Мало интересует' }
      ]
    },
    {
      id: 'knowledge',
      question: 'Как бы вы оценили свои знания об авиастроении?',
      options: [
        { value: 'expert', label: 'Хорошо знаком' },
        { value: 'basic', label: 'Базовые знания' },
        { value: 'little', label: 'Знаю мало' },
        { value: 'none', label: 'Не знаком' }
      ]
    },
    {
      id: 'career',
      question: 'Рассматриваете ли вы карьеру в авиастроении?',
      options: [
        { value: 'yes', label: 'Да, серьёзно рассматриваю' },
        { value: 'maybe', label: 'Возможно, в будущем' },
        { value: 'unsure', label: 'Пока не уверен' },
        { value: 'no', label: 'Нет, не рассматриваю' }
      ]
    },
    {
      id: 'fears',
      question: 'Какие страхи или сомнения у вас есть относительно этой карьеры?',
      options: [
        { value: 'difficulty', label: 'Сложность обучения' },
        { value: 'competition', label: 'Высокая конкуренция' },
        { value: 'salary', label: 'Заработная плата' },
        { value: 'responsibility', label: 'Высокая ответственность' },
        { value: 'no_fears', label: 'Нет сомнений' }
      ]
    },
    {
      id: 'future_contribution',
      question: 'Как вы представляете свой вклад в развитие авиации через 5 лет?',
      options: [
        { value: 'engineer', label: 'Инженером на производстве' },
        { value: 'designer', label: 'Конструктором новых проектов' },
        { value: 'researcher', label: 'Исследователем новых технологий' },
        { value: 'manager', label: 'Руководителем проектов' },
        { value: 'unsure', label: 'Пока не определился' }
      ]
    },
    {
      id: 'innovation',
      question: 'Хотели бы вы участвовать в создании принципиально новых летательных аппаратов?',
      options: [
        { value: 'yes_dream', label: 'Да, это моя мечта' },
        { value: 'yes_interesting', label: 'Да, было бы интересно' },
        { value: 'prefer_existing', label: 'Предпочитаю работу с существующими' },
        { value: 'no', label: 'Нет, не интересует' }
      ]
    },
    {
      id: 'opinion',
      question: 'Ваше личное мнение о профессии авиастроителя',
      options: [
        { value: 'prestigious', label: 'Престижная и перспективная' },
        { value: 'interesting', label: 'Интересная и творческая' },
        { value: 'difficult', label: 'Сложная, но важная' },
        { value: 'patriotic', label: 'Важна для страны' },
        { value: 'neutral', label: 'Обычная профессия' }
      ]
    }
  ];

  const universities = [
    {
      name: 'ИАТУ',
      fullName: 'Институт авиационных технологий и управления Ульяновского государственного технического университета (УлГТУ)',
      description: 'Ведущий центр подготовки инженеров в области авиастроения в Ульяновске'
    },
    {
      name: 'УАвиаК-МЦК',
      fullName: 'Ульяновский Авиационный колледж - Межрегиональный центр компетенций',
      description: 'Современная площадка для подготовки квалифицированных специалистов среднего звена'
    }
  ];

  const currentUrl = window.location.href;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Plane" size={28} className="text-primary" />
              <span className="text-xl font-bold text-secondary">АвиаКарьера</span>
            </div>
            <div className="hidden md:flex gap-6">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'survey', label: 'Опрос' },
                { id: 'profession', label: 'О профессии' },
                { id: 'education', label: 'Где учиться' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id ? 'text-primary' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-6 leading-tight">
                Построй будущее в небе
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Авиастроение — это профессия, которая объединяет инженерное мастерство, 
                инновации и стремление к совершенству. Создавай самолёты, которые изменят мир.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => scrollToSection('survey')}
                  className="bg-primary hover:bg-primary/90"
                >
                  Пройти опрос
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection('profession')}
                >
                  Узнать больше
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <img
                src="https://cdn.poehali.dev/files/37aa808a-d022-409c-8ae5-d1b3387bd741.jpg"
                alt="Ил-76"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="survey" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-secondary mb-4">Опрос для школьников и студентов</h2>
            <p className="text-lg text-gray-600 mb-4">
              Помогите нам понять, как молодёжь относится к профессии авиастроителя
            </p>
            <Button
              onClick={() => window.location.href = '/stats'}
              variant="outline"
              className="mb-6"
            >
              <Icon name="BarChart3" size={20} className="mr-2" />
              Посмотреть результаты опроса
            </Button>
          </div>

          {!surveySubmitted ? (
            <Card className="shadow-lg">
              <CardContent className="pt-6 space-y-8">
                {textFields.map((field, index) => (
                  <div key={field.id} className="space-y-2">
                    <Label className="text-lg font-semibold text-secondary">
                      {index + 1}. {field.label}
                    </Label>
                    <Input
                      type={field.type || 'text'}
                      placeholder={field.placeholder}
                      value={surveyAnswers[field.id] || ''}
                      onChange={(e) =>
                        setSurveyAnswers({ ...surveyAnswers, [field.id]: e.target.value })
                      }
                      className="text-base"
                    />
                  </div>
                ))}
                {surveyQuestions.map((question, index) => (
                  <div key={question.id} className="space-y-4">
                    <Label className="text-lg font-semibold text-secondary">
                      {index + 4}. {question.question}
                    </Label>
                    <RadioGroup
                      value={surveyAnswers[question.id]}
                      onValueChange={(value) =>
                        setSurveyAnswers({ ...surveyAnswers, [question.id]: value })
                      }
                    >
                      {question.options.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                          <Label
                            htmlFor={`${question.id}-${option.value}`}
                            className="cursor-pointer font-normal"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
                <Button
                  onClick={handleSurveySubmit}
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  Отправить ответы
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-lg bg-green-50 border-green-200">
              <CardContent className="pt-6 text-center">
                <Icon name="CheckCircle" size={64} className="text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-secondary mb-2">Спасибо за участие!</h3>
                <p className="text-gray-600">
                  Ваши ответы помогут улучшить образовательные программы по авиастроению
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section id="profession" className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">О профессии авиастроителя</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'Cog',
                title: 'Проектирование',
                description: 'Создание чертежей, расчёт конструкций, моделирование аэродинамики'
              },
              {
                icon: 'Wrench',
                title: 'Производство',
                description: 'Сборка самолётов, контроль качества, испытания систем'
              },
              {
                icon: 'Rocket',
                title: 'Инновации',
                description: 'Разработка новых материалов, технологий и систем управления'
              }
            ].map((item, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all">
                <CardHeader>
                  <Icon name={item.icon} size={48} className="mb-4" />
                  <CardTitle className="text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/80">{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Почему авиастроение?</h3>
                <ul className="space-y-3">
                  {[
                    'Высокая востребованность специалистов',
                    'Достойная заработная плата',
                    'Работа на передовых предприятиях',
                    'Участие в значимых проектах',
                    'Возможности карьерного роста'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Icon name="Check" size={24} className="text-green-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <img
                src="https://cdn.poehali.dev/projects/95931694-5656-4801-8df2-de8d83b40145/files/110b2078-6f71-458e-a6d3-ef33f4368514.jpg"
                alt="Авиационная инфографика"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-secondary mb-4 text-center">Где учиться</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Ведущие вузы России для будущих авиастроителей
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {universities.map((uni, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="GraduationCap" className="text-primary" />
                    {uni.name}
                  </CardTitle>
                  <CardDescription className="font-semibold text-secondary">
                    {uni.fullName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{uni.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="companies" className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-secondary mb-4 text-center">Где работать</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Ведущие авиастроительные предприятия Ульяновска
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="hover:shadow-xl transition-shadow border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Factory" className="text-primary" />
                  АО "Авиастар-СП"
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-3">
                  Крупнейший производитель тяжелых транспортных самолётов Ил-76, Ту-204
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Производство</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Инженерия</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Конструкторы</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Settings" className="text-primary" />
                  УКБП
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-3">
                  Ульяновское конструкторское бюро приборостроения — разработка авиационных систем
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Разработка</span>
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">Инновации</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">R&D</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Wrench" className="text-primary" />
                  УЗГА
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-3">
                  Ульяновский завод гражданской авиации — ремонт и модернизация воздушных судов
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Ремонт</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Модернизация</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Обслуживание</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 max-w-3xl mx-auto">
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Icon name="Briefcase" size={32} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-2">Карьерные возможности</h3>
                    <p className="text-gray-600">
                      После окончания учёбы в ИАТУ или УАвиаК-МЦК вы сможете устроиться на эти предприятия. 
                      Ульяновск — один из крупнейших авиационных центров России с богатой историей и перспективным будущим.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-secondary mb-8">Поделитесь этим сайтом</h2>
            <p className="text-lg text-gray-600 mb-8">
              Отсканируйте QR-код или поделитесь ссылкой с друзьями
            </p>
            <div className="bg-white p-8 rounded-2xl shadow-lg inline-block">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(currentUrl)}`}
                alt="QR код сайта"
                className="w-64 h-64 mx-auto"
              />
              <p className="mt-4 text-sm text-gray-500">Наведите камеру для перехода на сайт</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-white py-8 px-4">
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

export default Index;