import React from "react";
import { Button } from "../../../../components/ui/button";

export const HeroBannerSection = (): JSX.Element => {
  const navigationLinks = [
    "Компания",
    "Решения АСМО",
    "Платформа АСМО",
    "Карьера",
    "Партнеры",
    "Блог",
    "Контакты",
  ];

  const paginationDots = [
    { active: true },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
  ];

  return (
    <section className="relative w-full h-[900px] bg-[url(/bg-2.png)] bg-cover bg-[50%_50%]">
      <header className="flex w-full max-w-[1720px] mx-auto items-center justify-between pt-5 px-[100px] bg-transparent">
        <div className="relative w-[218px] h-5">
          <img
            className="w-[218px] h-[19px]"
            alt="Logoinf"
            src="/logoinf-1.png"
          />
        </div>

        <nav className="flex items-center gap-[30px]">
          {navigationLinks.map((link, index) => (
            <a
              key={index}
              href="#"
              className="font-1920-link font-[number:var(--1920-link-font-weight)] text-white text-[length:var(--1920-link-font-size)] tracking-[var(--1920-link-letter-spacing)] leading-[var(--1920-link-line-height)] [font-style:var(--1920-link-font-style)] hover:opacity-80 transition-opacity"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <div className="flex items-center justify-end gap-5">
            <a
              href="tel:88005500037"
              className="font-1920-link-2 font-[number:var(--1920-link-2-font-weight)] text-white text-[length:var(--1920-link-2-font-size)] tracking-[var(--1920-link-2-letter-spacing)] leading-[var(--1920-link-2-line-height)] [font-style:var(--1920-link-2-font-style)] hover:opacity-80 transition-opacity"
            >
              8 800 550-00-37
            </a>

            <a
              href="mailto:asmo@inform.ivanovo.ru"
              className="font-1920-link-2 font-[number:var(--1920-link-2-font-weight)] text-white text-[length:var(--1920-link-2-font-size)] tracking-[var(--1920-link-2-letter-spacing)] leading-[var(--1920-link-2-line-height)] [font-style:var(--1920-link-2-font-style)] hover:opacity-80 transition-opacity"
            >
              asmo@inform.ivanovo.ru
            </a>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="bg-white-10 hover:bg-white-20 h-auto p-2.5"
          >
            <img className="w-4 h-4" alt="Icon" src="/icon-7.svg" />
          </Button>

          <Button className="h-10 bg-white text-black hover:bg-white/90 font-1920-button font-[number:var(--1920-button-font-weight)] text-[length:var(--1920-button-font-size)] tracking-[var(--1920-button-letter-spacing)] leading-[var(--1920-button-line-height)] [font-style:var(--1920-button-font-style)] h-auto px-2.5 py-2.5">
            Обратный звонок
          </Button>
        </div>
      </header>

      <main className="flex flex-col w-full max-w-[1720px] mx-auto items-start gap-5 px-[100px] pt-[468px]">
        <h1 className="font-1920-h1 font-[number:var(--1920-h1-font-weight)] text-white text-[length:var(--1920-h1-font-size)] tracking-[var(--1920-h1-letter-spacing)] leading-[var(--1920-h1-line-height)] [font-style:var(--1920-h1-font-style)]">
          РАЗРАБАТЫВАЕМ СИСТЕМЫ АВТОМАТИЗАЦИИ ДЕЯТЕЛЬНОСТИ ПРЕДПРИЯТИЙ
        </h1>

        <p className="w-[800px] font-1920-description font-[number:var(--1920-description-font-weight)] text-white text-[length:var(--1920-description-font-size)] tracking-[var(--1920-description-letter-spacing)] leading-[var(--1920-description-line-height)] [font-style:var(--1920-description-font-style)]">
          Предлагаем инновационные решения для вашего бизнеса
        </p>

        <Button className="bg-white text-black hover:bg-white/90 font-1920-button font-[number:var(--1920-button-font-weight)] text-[length:var(--1920-button-font-size)] tracking-[var(--1920-button-letter-spacing)] leading-[var(--1920-button-line-height)] [font-style:var(--1920-button-font-style)] h-auto p-5">
          Узнать подробнее
        </Button>
      </main>

      <div className="flex items-center gap-2.5 absolute bottom-[60px] left-[100px]">
        {paginationDots.map((dot, index) => (
          <button
            key={index}
            className={`w-5 h-5 transition-colors hover:opacity-80 ${
              dot.active ? "bg-white" : "bg-white-60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
