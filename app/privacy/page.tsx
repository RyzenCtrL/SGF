import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[800px] px-5 py-section-mobile md:px-8 lg:px-10 lg:py-section-inner">
      <h1 className="text-h1 font-heading text-text-primary">Политика конфиденциальности</h1>
      <div className="mt-8 flex flex-col gap-6 text-body text-text-secondary">
        <p>
          {/* TODO: заменить на юридически выверенный текст политики конфиденциальности */}
          Настоящая политика определяет порядок обработки персональных данных пользователей
          сайта {siteConfig.domain} компанией {siteConfig.legalName} (ИНН {siteConfig.inn},
          ОГРН {siteConfig.ogrn}).
        </p>
        <p>
          Отправляя заявку через формы на сайте, вы даёте согласие на обработку указанных
          персональных данных (имя, телефон, e-mail) в целях связи с вами по вопросу расчёта
          проекта. Данные не передаются третьим лицам, за исключением случаев, предусмотренных
          законодательством РФ.
        </p>
        <p>
          Вы можете отозвать согласие на обработку персональных данных, направив запрос на
          e-mail {siteConfig.email}.
        </p>
      </div>
    </div>
  );
}
