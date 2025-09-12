import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const ContactUsSection = (): JSX.Element => {
  return (
    <section className="w-full h-[700px] bg-[url(/bg-1.png)] bg-cover bg-center flex items-center justify-center">
      <Card className="bg-transparent border-none shadow-none">
        <CardContent className="flex flex-col items-center gap-5 p-0">
          <h2 className="font-1920-h2 font-[number:var(--1920-h2-font-weight)] text-white text-[length:var(--1920-h2-font-size)] text-center tracking-[var(--1920-h2-letter-spacing)] leading-[var(--1920-h2-line-height)] [font-style:var(--1920-h2-font-style)]">
            ЗАКАЗАТЬ КОНСУЛЬТАЦИЮ
          </h2>

          <p className="w-[540px] font-1920-txt font-[number:var(--1920-txt-font-weight)] text-white-60 text-[length:var(--1920-txt-font-size)] text-center tracking-[var(--1920-txt-letter-spacing)] leading-[var(--1920-txt-line-height)] [font-style:var(--1920-txt-font-style)]">
            Расскажите о вашей задаче. Подготовим решение, проведём
            демонстрацию, рассчитаем стоимость.
          </p>

          <Button className="bg-white text-black hover:bg-white/90 p-5 h-auto font-1920-button font-[number:var(--1920-button-font-weight)] text-[length:var(--1920-button-font-size)] tracking-[var(--1920-button-letter-spacing)] leading-[var(--1920-button-line-height)] [font-style:var(--1920-button-font-style)]">
            Заказать консультацию
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};
