import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const productData = [
  {
    title: "АСМОграф",
    description:
      "Кроссплатформенный векторный графический редактор для создания инженерных и деловых схем. Поддерживает совместную работу, импорт и экспорт схем Visio и AutoCAD, заменяет иностранные решения.",
    image: "/products-3.svg",
    imageClass: "w-[200px] h-[200px]",
  },
  {
    title: "АСМО-ТОиР",
    description:
      "Автоматизирует процессы планирования, учёта и документооборота по техническому обслуживанию и ремонту оборудования.",
    image: "/products.svg",
    imageClass: "w-[200px] h-[200.07px] mb-[-0.04px]",
  },
  {
    title: "АСМО-диспетчер",
    description:
      "Обработка оперативной и планово‑экономической информации в диспетчерских службах. Обеспечивает контроль за технологическим режимом.",
    image: "/products-2.svg",
    imageClass: "w-[200px] h-[200px]",
  },
  {
    title: "АСМО-ВТиПО",
    description:
      "Учёт и сопровождение вычислительной техники и программного обеспечения на предприятии. Оптимизирует управление ИТ-активами и их жизненным циклом.",
    image: "/products-1.svg",
    imageClass: "w-[200px] h-[200px]",
  },
];

export const OurProductsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-start gap-10 relative">
      <header className="w-full items-center gap-5 flex-[0_0_auto] flex relative">
        <h2 className="relative flex-1 mt-[-1.00px] font-1920-h2 font-[number:var(--1920-h2-font-weight)] text-black text-[length:var(--1920-h2-font-size)] tracking-[var(--1920-h2-letter-spacing)] leading-[var(--1920-h2-line-height)] [font-style:var(--1920-h2-font-style)]">
          РЕШЕНИЯ АСМО
        </h2>

        <nav className="inline-flex h-10 items-center gap-2.5 relative flex-[0_0_auto]">
          <Button
            variant="ghost"
            size="icon"
            className="w-[30px] h-10 bg-blue-other p-0 hover:bg-blue-other/80"
          >
            <ChevronLeftIcon className="w-3 h-[21px]" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-[30px] h-10 bg-blue-other p-0 hover:bg-blue-other/80"
          >
            <ChevronRightIcon className="w-3 h-[21px]" />
          </Button>
        </nav>
      </header>

      <div className="items-start justify-end gap-5 flex flex-col relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex items-center gap-5 relative self-stretch w-full flex-[0_0_auto]">
          {productData.map((product, index) => (
            <Card
              key={index}
              className="flex flex-col h-[460px] items-end justify-between p-5 relative flex-1 grow bg-[linear-gradient(0deg,rgba(20,57,191,1)_0%,rgba(3,11,57,1)_100%)] border-0"
            >
              <CardContent className="flex-col gap-2.5 self-stretch w-full flex-[0_0_auto] flex items-start relative p-0">
                <h3 className="relative self-stretch mt-[-1.00px] font-1920-h3 font-[number:var(--1920-h3-font-weight)] text-white text-[length:var(--1920-h3-font-size)] tracking-[var(--1920-h3-letter-spacing)] leading-[var(--1920-h3-line-height)] [font-style:var(--1920-h3-font-style)]">
                  {product.title}
                </h3>

                <p className="relative self-stretch font-1920-txt font-[number:var(--1920-txt-font-weight)] text-white text-[length:var(--1920-txt-font-size)] tracking-[var(--1920-txt-letter-spacing)] leading-[var(--1920-txt-line-height)] [font-style:var(--1920-txt-font-style)]">
                  {product.description}
                </p>
              </CardContent>

              <img
                className={`relative ${product.imageClass}`}
                alt="Products"
                src={product.image}
              />
            </Card>
          ))}
        </div>

        <Button
          variant="ghost"
          className="flex justify-center p-5 self-stretch w-full flex-[0_0_auto] bg-black items-center gap-2.5 relative h-auto hover:bg-black/80"
        >
          <span className="relative w-fit mt-[-1.00px] font-1920-button font-[number:var(--1920-button-font-weight)] text-white text-[length:var(--1920-button-font-size)] tracking-[var(--1920-button-letter-spacing)] leading-[var(--1920-button-line-height)] whitespace-nowrap [font-style:var(--1920-button-font-style)]">
            Смотреть все решения
          </span>
        </Button>
      </div>
    </section>
  );
};
