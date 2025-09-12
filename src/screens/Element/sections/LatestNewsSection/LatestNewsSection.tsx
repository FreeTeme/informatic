import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const newsData = [
  {
    id: 1,
    date: "01.01.2025",
    title: "ПОДТВЕРЖДЕНИЕ ЛИДЕРСТВА: ИТОГИ ПРЕМИИ «ИНДЕКС ДЕЛА»",
    content:
      "17 июня в Санкт-Петербурге прошёл финал всероссийской государственной премии «Индекс Дела», организованной при поддержке Минэкономразвития России. В течение года эксперты анализировали 12 000 компаний по более чем 35 критериям — от темпов роста выручки до цифрового следа в сети.",
    featured: true,
    bannerTitle: "ВОШЛИ В ТОП-100 БИЗНЕСА СТРАНЫ!",
    bannerSubtitle: "Наш успех на всероссийской премии «Индекс Дела»",
  },
  {
    id: 2,
    date: "01.01.2025",
    title: "АСМОГРАФ 2.0. ПОЛНАЯ ПЕРЕЗАГРУЗКА",
    content: [
      "Рады поделиться новой версией программного комплекса АСМОграф!",
      "Главное нововведение — два интерфейса на выбор. Теперь пользователи могут настроить визуальное окружение под себя:",
      "Ленточный интерфейс — современный и дружелюбный стиль, привычный для знатоков MS Visio. Классический интерфейс — привычное рабочее пространство для тех, кто работает в АСМОграфе много лет.",
    ],
    featured: false,
  },
  {
    id: 3,
    date: "01.01.2025",
    title: "ПОБЫВАЛИ НА КОНФЕРЕНЦИИ ПО ЛОКАЛИЗАЦИИ ИТ-РЕШЕНИЙ В МОСКВЕ",
    content: [
      "23 апреля в Москве состоялось мероприятие, посвящённое современным технологиям на российском рынке, где собрались представители российских компаний из разных отраслей для обмена опытом и обсуждения актуальных задач.",
      "",
      "Мы рассказали о современных решениях для автоматизации внутренних процессов, подчеркнув важность удобной интеграции и снижения затрат при внедрении новых ИТ-инструментов.",
      "Благодарим Тринити Интеграция за отличную возможность обсудить перспективы развития отрасли и поделиться практическим опытом!",
    ],
    featured: false,
  },
  {
    id: 4,
    date: "01.01.2025",
    title: "ИТ-ХИТЫ В ЭФИРЕ: КАК МЫ ЗВУЧАЛИ НА AXOFT ПЛАТФОРМЕ",
    content: [
      "Мы представили наши ключевые программные решения, в том числе кроссплатформенный графический редактор АСМОграф, и провели ряд встреч с действующими и потенциальными партнёрами.",
      "",
      "Заместитель генерального директора Михаил Козлов выступил в блиц-панели, рассказав о преимуществах наших продуктов и их роли в развитии цифровой инфраструктуры.",
    ],
    featured: false,
  },
];

export const LatestNewsSection = (): JSX.Element => {
  const featuredNews = newsData.find((news) => news.featured);
  const regularNews = newsData.filter((news) => !news.featured);

  return (
    <section className="w-full flex flex-col gap-10 relative">
      <h2 className="font-1920-h2 font-[number:var(--1920-h2-font-weight)] text-black text-[length:var(--1920-h2-font-size)] tracking-[var(--1920-h2-letter-spacing)] leading-[var(--1920-h2-line-height)] [font-style:var(--1920-h2-font-style)]">
        НОВОСТИ
      </h2>

      <div className="flex flex-col gap-5 w-full">
        <div className="grid grid-cols-2 gap-5 w-full">
          {featuredNews && (
            <Card className="bg-white p-5 flex flex-col gap-5">
              <CardContent className="p-0">
                <div className="h-[362px] flex flex-col justify-end gap-2.5 p-5 [background:url(../banner.png)_50%_50%_/_cover]">
                  <div className="[font-family:'Hauora-Regular',Helvetica] font-normal text-white text-6xl tracking-[-1.80px] leading-[60px]">
                    {featuredNews.bannerTitle}
                  </div>
                  <div className="[font-family:'Hauora-Regular',Helvetica] font-normal text-white text-lg tracking-[-0.54px] leading-[19.8px] whitespace-nowrap">
                    {featuredNews.bannerSubtitle}
                  </div>
                </div>
                <div className="flex flex-col gap-2.5 pt-5">
                  <div className="font-1920-date font-[number:var(--1920-date-font-weight)] text-black-60 text-[length:var(--1920-date-font-size)] tracking-[var(--1920-date-letter-spacing)] leading-[var(--1920-date-line-height)] [font-style:var(--1920-date-font-style)]">
                    {featuredNews.date}
                  </div>
                  <div className="font-1920-h4 font-[number:var(--1920-h4-font-weight)] text-black text-[length:var(--1920-h4-font-size)] tracking-[var(--1920-h4-letter-spacing)] leading-[var(--1920-h4-line-height)] [font-style:var(--1920-h4-font-style)]">
                    {featuredNews.title}
                  </div>
                  <div className="h-10 font-1920-txt font-[number:var(--1920-txt-font-weight)] text-black text-[length:var(--1920-txt-font-size)] tracking-[var(--1920-txt-letter-spacing)] leading-[var(--1920-txt-line-height)] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] [font-style:var(--1920-txt-font-style)]">
                    {featuredNews.content}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-col gap-5">
            {regularNews.map((news) => (
              <Card key={news.id} className="bg-white p-5 flex-1">
                <CardContent className="p-0 flex flex-col gap-2.5 h-full">
                  <div className="font-1920-date font-[number:var(--1920-date-font-weight)] text-black-60 text-[length:var(--1920-date-font-size)] tracking-[var(--1920-date-letter-spacing)] leading-[var(--1920-date-line-height)] [font-style:var(--1920-date-font-style)]">
                    {news.date}
                  </div>
                  <div className="font-1920-h4 font-[number:var(--1920-h4-font-weight)] text-black text-[length:var(--1920-h4-font-size)] tracking-[var(--1920-h4-letter-spacing)] leading-[var(--1920-h4-line-height)] [font-style:var(--1920-h4-font-style)]">
                    {news.title}
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    {Array.isArray(news.content) ? (
                      news.content.map((paragraph, index) => (
                        <div
                          key={index}
                          className="font-1920-txt font-[number:var(--1920-txt-font-weight)] text-black text-[length:var(--1920-txt-font-size)] tracking-[var(--1920-txt-letter-spacing)] leading-[var(--1920-txt-line-height)] [font-style:var(--1920-txt-font-style)]"
                        >
                          {paragraph === "" ? <br /> : paragraph}
                        </div>
                      ))
                    ) : (
                      <div className="font-1920-txt font-[number:var(--1920-txt-font-weight)] text-black text-[length:var(--1920-txt-font-size)] tracking-[var(--1920-txt-letter-spacing)] leading-[var(--1920-txt-line-height)] [font-style:var(--1920-txt-font-style)]">
                        {news.content}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Button className="bg-black text-white p-5 h-auto w-full justify-center font-1920-button font-[number:var(--1920-button-font-weight)] text-[length:var(--1920-button-font-size)] tracking-[var(--1920-button-letter-spacing)] leading-[var(--1920-button-line-height)] [font-style:var(--1920-button-font-style)]">
          Перейти ко всем новостям
        </Button>
      </div>
    </section>
  );
};
