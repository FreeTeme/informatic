import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const BenefitsSection = (): JSX.Element => {
  const benefits = [
    {
      icon: "/icon-4.svg",
      title: "Эксперты IT-рынка",
      description: null,
    },
    {
      icon: "/icon-1.svg",
      title: "Импортозамещение",
      description:
        "Наши решения — это на 100% российское ПО, которое создаётся, учитывая потребности заказчиков и рынка в целом",
    },
    {
      icon: "/icon.svg",
      title: "Полный цикл",
      description:
        "Наша компания оказывает услуги по внедрению, сопровождению, технической поддержке и развитию программного обеспечения",
    },
    {
      icon: "/icon-5.svg",
      title: "Проектный опыт",
      description:
        "Более 500 успешных внедрений решений на крупнейших промышленных предприятиях страны",
    },
  ];

  return (
    <section className="flex items-start gap-[327px] w-full relative">
      <h2 className="w-fit font-1920-h2 font-[number:var(--1920-h2-font-weight)] text-black text-[length:var(--1920-h2-font-size)] tracking-[var(--1920-h2-letter-spacing)] leading-[var(--1920-h2-line-height)] whitespace-nowrap [font-style:var(--1920-h2-font-style)]">
        НАШИ ПРЕИМУЩЕСТВА
      </h2>

      <div className="flex flex-col w-[860px] items-start gap-5">
        {benefits.map((benefit, index) => (
          <Card key={index} className="w-full bg-white border-0 shadow-none">
            <CardContent className="flex items-start gap-5 p-5">
              <img
                className="w-8 h-8 flex-shrink-0"
                alt="Icon"
                src={benefit.icon}
              />

              <div className="flex flex-col gap-2.5 flex-1">
                <h3 className="font-1920-h3 font-[number:var(--1920-h3-font-weight)] text-black text-[length:var(--1920-h3-font-size)] tracking-[var(--1920-h3-letter-spacing)] leading-[var(--1920-h3-line-height)] [font-style:var(--1920-h3-font-style)]">
                  {benefit.title}
                </h3>

                {benefit.description && (
                  <p className="w-[500px] font-1920-txt font-[number:var(--1920-txt-font-weight)] text-black text-[length:var(--1920-txt-font-size)] tracking-[var(--1920-txt-letter-spacing)] leading-[var(--1920-txt-line-height)] [font-style:var(--1920-txt-font-style)]">
                    {benefit.description}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
