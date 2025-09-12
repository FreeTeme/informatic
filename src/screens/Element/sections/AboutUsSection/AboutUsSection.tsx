import React from "react";

export const AboutUsSection = (): JSX.Element => {
  const leftColumnContent = [
    {
      text: "Российский разработчик в сфере автоматизированных систем управления с 1957 года.",
      className:
        "font-1920-txt-2 font-[number:var(--1920-txt-2-font-weight)] text-black text-[length:var(--1920-txt-2-font-size)] tracking-[var(--1920-txt-2-letter-spacing)] leading-[var(--1920-txt-2-line-height)] [font-style:var(--1920-txt-2-font-style)]",
    },
    {
      text: "Предоставляет готовые решения в области производственно-технологической и финансово‑хозяйственной деятельности предприятий, а также работы служб по управлению персоналом и социальной сферы.",
      className:
        "font-1920-txt-2 font-[number:var(--1920-txt-2-font-weight)] text-black text-[length:var(--1920-txt-2-font-size)] tracking-[var(--1920-txt-2-letter-spacing)] leading-[var(--1920-txt-2-line-height)] [font-style:var(--1920-txt-2-font-style)]",
    },
  ];

  const rightColumnContent = [
    {
      text: "Все программные решения, разработанные АО «Информатика», созданы на базе собственной инструментальной платформы для разработки «АСМО» и представляют собой целую экосистему с едиными механизмами и интерфейсами.",
      className:
        "font-1920-txt font-[number:var(--1920-txt-font-weight)] text-black text-[length:var(--1920-txt-font-size)] tracking-[var(--1920-txt-letter-spacing)] leading-[var(--1920-txt-line-height)] [font-style:var(--1920-txt-font-style)]",
    },
    {
      text: "Компания проводит полный цикл разработки от анализа потребностей клиента до внедрения, обучения и технической поддержки. Специалисты вендора готовы к персональным доработкам и развитию любого из существующих решений.",
      className:
        "font-1920-txt font-[number:var(--1920-txt-font-weight)] text-black text-[length:var(--1920-txt-font-size)] tracking-[var(--1920-txt-letter-spacing)] leading-[var(--1920-txt-line-height)] [font-style:var(--1920-txt-font-style)]",
    },
  ];

  return (
    <section className="flex flex-col w-full items-start gap-10 relative">
      <header className="w-full">
        <h2 className="font-1920-h2 font-[number:var(--1920-h2-font-weight)] text-black text-[length:var(--1920-h2-font-size)] tracking-[var(--1920-h2-letter-spacing)] leading-[var(--1920-h2-line-height)] [font-style:var(--1920-h2-font-style)]">
          О КОМПАНИИ
        </h2>
      </header>

      <div className="flex flex-col items-center gap-20 w-full">
        <div className="flex justify-between items-start w-full gap-20">
          <div className="flex-1 flex items-start gap-2.5">
            <div className="flex flex-col items-start gap-5 max-w-[705px]">
              {leftColumnContent.map((content, index) => (
                <div
                  key={`left-content-${index}`}
                  className={content.className}
                >
                  {content.text}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-start gap-5">
            <div className="flex flex-col items-start gap-2 max-w-[600px]">
              {rightColumnContent.map((content, index) => (
                <div
                  key={`right-content-${index}`}
                  className={content.className}
                >
                  {content.text}
                </div>
              ))}
            </div>

            <div className="flex flex-col items-start gap-2.5 max-w-[600px]">
              <h3 className="font-1920-h6 font-[number:var(--1920-h6-font-weight)] text-blue text-[length:var(--1920-h6-font-size)] tracking-[var(--1920-h6-letter-spacing)] leading-[var(--1920-h6-line-height)] [font-style:var(--1920-h6-font-style)]">
                Наша миссия
              </h3>

              <p className="font-1920-txt font-[number:var(--1920-txt-font-weight)] text-black text-[length:var(--1920-txt-font-size)] tracking-[var(--1920-txt-letter-spacing)] leading-[var(--1920-txt-line-height)] [font-style:var(--1920-txt-font-style)]">
                Разрабатывать инновационное программное обеспечение, которое
                обеспечивает динамичное развитие бизнеса предприятий и
                эффективную работу их персонала, используя весь накопленный опыт
                и креативное мышление наших сотрудников. Стать лидером в области
                разработки автоматизированных систем управления, инженерной и
                деловой векторной графики.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full overflow-hidden">
          <div className="font-1920-description-2 font-[number:var(--1920-description-2-font-weight)] text-[#1439bf33] text-[length:var(--1920-description-2-font-size)] tracking-[var(--1920-description-2-letter-spacing)] leading-[var(--1920-description-2-line-height)] whitespace-nowrap [font-style:var(--1920-description-2-font-style)] text-center">
            ИННОВАЦИИ&nbsp;&nbsp;КРЕАТИВНОСТЬ&nbsp;&nbsp;ЛИДЕРСТВО
          </div>
        </div>
      </div>
    </section>
  );
};
