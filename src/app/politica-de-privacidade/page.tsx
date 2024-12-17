import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface ContentItem {
  subtitle?: string;
  text?: string;
  list?: string[];
  html?: string;
}

interface Section {
  title: string;
  content: ContentItem[];
}

const privacyPolicySections: Section[] = [
  {
    title: "1. Coleta de Informações",
    content: [
      {
        subtitle: "a. Informações Fornecidas Voluntariamente",
        text: "Podemos coletar informações pessoais fornecidas por você ao entrar em contato conosco através de nosso email (contato@procure.ads) ou ao preencher formulários em nosso site.",
      },
      {
        subtitle: "b. Informações de Navegação",
        text: "Durante a visita ao nosso site, coletamos automaticamente informações como:",
        list: ["Endereço IP", "Tipo de navegador e dispositivo", "Páginas visitadas e tempo de permanência", "Cookies e tecnologias semelhantes"],
      },
      {
        subtitle: "c. Dados de Anúncios",
        text: "Coletamos e exibimos anúncios disponibilizados pela Meta Ads. Esses dados podem incluir:",
        list: ["Conteúdo e formatos de anúncios", "Estatísticas relacionadas à performance (quando aplicável)"],
      },
    ],
  },
  {
    title: "2. Uso das Informações",
    content: [
      {
        text: "Utilizamos os dados coletados para:",
        list: [
          "Melhorar a experiência do usuário no site",
          "Analisar o desempenho do site e dos anúncios",
          "Responder a solicitações de usuários e fornecer suporte",
          "Cumprir com obrigações legais e regulatórias",
        ],
      },
    ],
  },
  {
    title: "3. Compartilhamento de Informações",
    content: [
      {
        text: "Não compartilhamos suas informações pessoais com terceiros, exceto:",
        list: [
          "Quando exigido por lei",
          "Para proteger nossos direitos legais",
          "Com prestadores de serviço de confiança que auxiliam na operação do site",
        ],
      },
    ],
  },
  {
    title: "4. Cookies e Tecnologias Semelhantes",
    content: [
      {
        text: "Nosso site utiliza cookies para:",
        list: ["Personalizar conteúdo e análises", "Melhorar a funcionalidade do site"],
      },
      {
        text: "Você pode gerenciar ou desativar os cookies nas configurações do seu navegador. No entanto, isso pode afetar a experiência no site.",
      },
    ],
  },
  {
    title: "5. Proteção de Dados",
    content: [
      {
        text: "Adotamos medidas técnicas e organizacionais para proteger suas informações pessoais contra acessos não autorizados, alterações, divulgações ou destruições.",
      },
    ],
  },
  {
    title: "6. Links de Terceiros",
    content: [
      {
        text: "Nosso site pode conter links para outros sites. Não somos responsáveis pelas práticas de privacidade de terceiros e recomendamos que você leia as políticas de privacidade desses sites.",
      },
    ],
  },
  {
    title: "7. Direitos do Usuário",
    content: [
      {
        text: "Você tem o direito de:",
        list: [
          "Acessar, corrigir ou excluir suas informações pessoais",
          "Solicitar a limitação ou oposição ao uso de seus dados",
          "Retirar seu consentimento, quando aplicável",
        ],
      },
      {
        text: "Para exercer seus direitos, entre em contato conosco pelo email contato@procure.ads.",
      },
    ],
  },
  {
    title: "8. Alterações nesta Política",
    content: [
      {
        text: "Podemos atualizar esta Política de Privacidade periodicamente. Qualquer alteração será publicada nesta página com a data de revisão atualizada.",
      },
    ],
  },
  {
    title: "9. Contato",
    content: [
      {
        text: "Se tiver dúvidas ou preocupações sobre esta Política de Privacidade, entre em contato conosco:",
      },
      {
        html: `
          <address class="mt-2">
            <strong>Procure Ads</strong><br />
            Email: <a href="mailto:contato@procure.ads" class="text-primary hover:underline">contato@procure.ads</a><br />
            Site: <a href="https://procureads.vercel.app" class="text-primary hover:underline">https://procureads.vercel.app</a>
          </address>
        `,
      },
    ],
  },
];

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Política de Privacidade - Procure Ads</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <section className="text-center text-muted-foreground">
            <h3 className="font-semibold mb-2">Atualização: 17/12/2024</h3>
            <p>
              Na Procure Ads, acessível pelo site{" "}
              <a href="https://procureads.vercel.app" className="text-primary hover:underline">
                https://procureads.vercel.app
              </a>
              , a sua privacidade é nossa prioridade. Esta Política de Privacidade explica como coletamos, usamos e protegemos as suas informações pessoais.
            </p>
          </section>

          <Separator />

          {privacyPolicySections.map((section, index) => (
            <section key={index} className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">{section.title}</h2>
              {section.content.map((item, itemIndex) => (
                <div key={itemIndex} className="space-y-2">
                  {item.subtitle && <h4 className="font-semibold text-lg">{item.subtitle}</h4>}
                  {item.text && <p className="text-muted-foreground">{item.text}</p>}
                  {item.list && (
                    <ul className="list-disc ml-5 space-y-1 text-muted-foreground">
                      {item.list.map((listItem, listItemIndex) => (
                        <li key={listItemIndex}>{listItem}</li>
                      ))}
                    </ul>
                  )}
                  {item.html && <div dangerouslySetInnerHTML={{ __html: item.html }} />}
                </div>
              ))}
            </section>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

