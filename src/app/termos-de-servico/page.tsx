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

const termsOfServiceSections: Section[] = [
  {
    title: "1. Aceitação dos Termos",
    content: [
      {
        text: "Ao acessar ou usar o serviço Procure Ads, você concorda em cumprir e estar vinculado a estes Termos de Serviço. Se você não concordar com alguma parte destes termos, você não poderá usar nosso serviço.",
      },
    ],
  },
  {
    title: "2. Descrição do Serviço",
    content: [
      {
        text: "O Procure Ads é uma plataforma que permite aos usuários pesquisar e analisar anúncios do Facebook. Nosso serviço inclui:",
        list: [
          "Acesso a uma base de dados de anúncios do Facebook",
          "Ferramentas de análise para examinar tendências e desempenho de anúncios",
          "Relatórios e insights sobre estratégias de publicidade",
        ],
      },
    ],
  },
  {
    title: "3. Conta de Usuário",
    content: [
      {
        text: "Para acessar certos recursos do nosso serviço, você pode precisar criar uma conta. Você é responsável por:",
        list: [
          "Manter a confidencialidade de sua conta e senha",
          "Restringir o acesso ao seu computador ou dispositivo",
          "Assumir responsabilidade por todas as atividades que ocorrem em sua conta",
        ],
      },
    ],
  },
  {
    title: "4. Uso Aceitável",
    content: [
      {
        text: "Você concorda em não usar o Procure Ads para:",
        list: [
          "Violar leis ou regulamentos",
          "Infringir direitos de propriedade intelectual",
          "Transmitir material ilegal, abusivo, difamatório ou de outra forma objetável",
          "Interferir ou interromper a integridade ou o desempenho do serviço",
          "Tentar obter acesso não autorizado a qualquer parte do serviço",
        ],
      },
    ],
  },
  {
    title: "5. Propriedade Intelectual",
    content: [
      {
        text: "O conteúdo, recursos e funcionalidades do Procure Ads são de propriedade da Procure Ads e estão protegidos por leis de direitos autorais, marcas registradas e outras leis de propriedade intelectual.",
      },
    ],
  },
  {
    title: "6. Limitação de Responsabilidade",
    content: [
      {
        text: "O Procure Ads não será responsável por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo perda de lucros, decorrentes do seu uso do serviço.",
      },
    ],
  },
  {
    title: "7. Modificações do Serviço",
    content: [
      {
        text: "Reservamo-nos o direito de modificar ou descontinuar, temporária ou permanentemente, o serviço (ou qualquer parte dele) com ou sem aviso prévio.",
      },
    ],
  },
  {
    title: "8. Rescisão",
    content: [
      {
        text: "Podemos encerrar ou suspender seu acesso imediatamente, sem aviso prévio ou responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar os Termos.",
      },
    ],
  },
  {
    title: "9. Lei Aplicável",
    content: [
      {
        text: "Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem considerar suas disposições sobre conflitos de leis.",
      },
    ],
  },
  {
    title: "10. Alterações nos Termos",
    content: [
      {
        text: "Reservamo-nos o direito, a nosso critério exclusivo, de modificar ou substituir estes Termos a qualquer momento. Se uma revisão for material, tentaremos fornecer um aviso com pelo menos 30 dias de antecedência antes que quaisquer novos termos entrem em vigor.",
      },
    ],
  },
  {
    title: "11. Contato",
    content: [
      {
        text: "Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco:",
      },
      {
        html: `
          <address class="mt-2">
            <strong>Procure Ads</strong><br />
            Email: <a href="mailto:contato@procure.ads" class="text-primary hover:underline">contato@procure.ads</a><br />
            Site: <a href="https://procureads.vercel.app/" class="text-primary hover:underline">https://procureads.vercel.app/</a>
          </address>
        `,
      },
    ],
  },
];

export default function TermosDeServicoPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Termos de Serviço - Procure Ads</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <section className="text-center text-muted-foreground">
            <h3 className="font-semibold mb-2">Última atualização: 17/12/2024</h3>
            <p>
              Bem-vindo ao Procure Ads. Ao usar nosso serviço, você concorda com os seguintes termos e condições.
              Por favor, leia-os cuidadosamente.
            </p>
          </section>

          <Separator />

          {termsOfServiceSections.map((section, index) => (
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

