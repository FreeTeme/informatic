import React from "react";
import { Button } from "../../../../components/ui/button";

const socialLinks = [
  { name: "Вконтакте" },
  { name: "Rutube" },
  { name: "YouTube" },
  { name: "Telegram" },
];

const companyInfo = [
  "ИHH: 3731000788",
  "КПП: 370201001",
  "ОГРН: 1023700538454",
  "Адрес: 153032, область Ивановская, город Иваново, улица Ташкентская, 90",
];

const aboutCompanyLinks = [
  "Выполненные проекты",
  "Отзывы",
  "История",
  "Карьера",
  "Информация эмитента",
  "Прочие услуги",
];

const servicesLinks = [
  "Внедрение",
  "Обучение",
  "Техподдержка",
  "Адаптация",
  "Разработка",
];

const otherLinks = [
  "Решения АСМО",
  "Партнёры",
  "Новости",
  "Статьи",
  "Контакты",
  "Документы",
  "Политика конфиденциальности",
  "Пользовательское соглашение",
];

export const SiteFooterSection = (): JSX.Element => {
  return (
    <footer className="relative w-full bg-transparent bg-[url(/bg.png)] bg-[100%_100%] py-20 px-[100px]">
      <div className="flex items-start gap-[461px] mb-[328px]">
        <div className="flex flex-col w-[400px] items-start justify-center gap-5">
          <div className="flex flex-col items-start gap-2.5 w-full">
            <h4 className="font-1920-h4 font-[number:var(--1920-h4-font-weight)] text-white text-[length:var(--1920-h4-font-size)] tracking-[var(--1920-h4-letter-spacing)] leading-[var(--1920-h4-line-height)] [font-style:var(--1920-h4-font-style)]">
              ВАС ИНТЕРЕСУЮТ НАШИ УСЛУГИ ИЛИ ПРОДУКЦИЯ?
            </h4>

            <p className="font-1920-txt font-[number:var(--1920-txt-font-weight)] text-white-60 text-[length:var(--1920-txt-font-size)] tracking-[var(--1920-txt-letter-spacing)] leading-[var(--1920-txt-line-height)] [font-style:var(--1920-txt-font-style)]">
              Оставьте свой номер телефона, и мы перезвоним вам в удобное для
              вас время!
            </p>
          </div>

          <Button className="h-10 bg-white text-black hover:bg-white/90 font-1920-button font-[number:var(--1920-button-font-weight)] text-[length:var(--1920-button-font-size)] tracking-[var(--1920-button-letter-spacing)] leading-[var(--1920-button-line-height)] [font-style:var(--1920-button-font-style)]">
            Обратный звонок
          </Button>
        </div>

        <div className="flex flex-col w-[861px] items-start gap-10">
          <div className="flex items-start gap-5 w-full">
            {socialLinks.map((link, index) => (
              <Button
                key={index}
                variant="ghost"
                className="h-10 flex-1 bg-white-10 hover:bg-white-20 font-1920-link font-[number:var(--1920-link-font-weight)] text-white text-[length:var(--1920-link-font-size)] tracking-[var(--1920-link-letter-spacing)] leading-[var(--1920-link-line-height)] [font-style:var(--1920-link-font-style)]"
              >
                {link.name}
              </Button>
            ))}
          </div>

          <div className="flex flex-col items-start gap-5 w-full">
            <div className="font-1920-link-3 font-[number:var(--1920-link-3-font-weight)] text-white text-[length:var(--1920-link-3-font-size)] tracking-[var(--1920-link-3-letter-spacing)] leading-[var(--1920-link-3-line-height)] [font-style:var(--1920-link-3-font-style)]">
              asmo@inform.ivanovo.ru
            </div>

            <div className="font-1920-link-3 font-[number:var(--1920-link-3-font-weight)] text-white text-[length:var(--1920-link-3-font-size)] tracking-[var(--1920-link-3-letter-spacing)] leading-[var(--1920-link-3-line-height)] [font-style:var(--1920-link-3-font-style)]">
              8 800 550-00-37
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-[180px] mb-[164px]">
        <div className="w-[400px] flex flex-col items-start gap-2">
          {companyInfo.map((info, index) => (
            <div
              key={index}
              className="font-1920-txt font-[number:var(--1920-txt-font-weight)] text-white-60 text-[length:var(--1920-txt-font-size)] tracking-[var(--1920-txt-letter-spacing)] leading-[var(--1920-txt-line-height)] [font-style:var(--1920-txt-font-style)]"
            >
              {info}
            </div>
          ))}
        </div>

        <div className="w-[1140px] flex items-start">
          <div className="flex-1 flex flex-col items-start gap-2.5">
            <h5 className="font-1920-h5 font-[number:var(--1920-h5-font-weight)] text-white-60 text-[length:var(--1920-h5-font-size)] tracking-[var(--1920-h5-letter-spacing)] leading-[var(--1920-h5-line-height)] [font-style:var(--1920-h5-font-style)]">
              О компании
            </h5>

            <div className="flex flex-col items-start gap-1.5">
              {aboutCompanyLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="link"
                  className="h-auto p-0 font-1920-link font-[number:var(--1920-link-font-weight)] text-white text-[length:var(--1920-link-font-size)] tracking-[var(--1920-link-letter-spacing)] leading-[var(--1920-link-line-height)] [font-style:var(--1920-link-font-style)] justify-start"
                >
                  {link}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-start gap-2.5">
            <h5 className="font-1920-h5 font-[number:var(--1920-h5-font-weight)] text-white-60 text-[length:var(--1920-h5-font-size)] tracking-[var(--1920-h5-letter-spacing)] leading-[var(--1920-h5-line-height)] [font-style:var(--1920-h5-font-style)]">
              Услуги
            </h5>

            <div className="flex flex-col items-start gap-1.5">
              {servicesLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="link"
                  className="h-auto p-0 font-1920-link font-[number:var(--1920-link-font-weight)] text-white text-[length:var(--1920-link-font-size)] tracking-[var(--1920-link-letter-spacing)] leading-[var(--1920-link-line-height)] [font-style:var(--1920-link-font-style)] justify-start"
                >
                  {link}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-start gap-2.5">
            <h5 className="font-1920-h5 font-[number:var(--1920-h5-font-weight)] text-white-60 text-[length:var(--1920-h5-font-size)] tracking-[var(--1920-h5-letter-spacing)] leading-[var(--1920-h5-line-height)] [font-style:var(--1920-h5-font-style)]">
              Платформа АСМО
            </h5>

            <Button
              variant="link"
              className="h-auto p-0 font-1920-link font-[number:var(--1920-link-font-weight)] text-white text-[length:var(--1920-link-font-size)] tracking-[var(--1920-link-letter-spacing)] leading-[var(--1920-link-line-height)] [font-style:var(--1920-link-font-style)] justify-start"
            >
              Платформа АСМО
            </Button>
          </div>

          <div className="flex-1 flex flex-col items-start gap-2.5">
            <h5 className="font-1920-h5 font-[number:var(--1920-h5-font-weight)] text-white-60 text-[length:var(--1920-h5-font-size)] tracking-[var(--1920-h5-letter-spacing)] leading-[var(--1920-h5-line-height)] [font-style:var(--1920-h5-font-style)]">
              Также
            </h5>

            <div className="flex flex-col items-start gap-1.5">
              {otherLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="link"
                  className="h-auto p-0 font-1920-link font-[number:var(--1920-link-font-weight)] text-white text-[length:var(--1920-link-font-size)] tracking-[var(--1920-link-letter-spacing)] leading-[var(--1920-link-line-height)] [font-style:var(--1920-link-font-style)] justify-start"
                >
                  {link}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-44">
        <img className="w-full h-[170px]" alt="Logoinf" src="/logoinf.png" />
      </div>
    </footer>
  );
};
