'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Search, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdResults } from "./ad-results"

interface Ad {
  id: string
  title: string
  body: string
  status: string
  callToActionType: string
  pageId: string
  pageName: string
  adLink?: string
  creationTime: string
  deliveryStartTime: string
}

interface SearchForm {
  searchTerm: string
  adType: string
}

export function SearchAds() {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<Ad[]>([])
  const [totalAds, setTotalAds] = useState(0)
  const [error, setError] = useState<string | null>(null)
  
  const { register, handleSubmit, formState: { errors } } = useForm<SearchForm>()

  const onSubmit = async (data: SearchForm) => {
    try {
      setIsLoading(true)
      setError(null)
    
      const response = await fetch('/api/ads/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Falha ao buscar anúncios')
      }

      setResults(result.data)
      setTotalAds(result.total)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="searchTerm">Termo de Pesquisa</Label>
            <Input
              id="searchTerm"
              placeholder="Digite palavras-chave..."
              {...register("searchTerm", { required: true })}
            />
            {errors.searchTerm && (
              <span className="text-sm text-red-500">Este campo é obrigatório</span>
            )}
            <input type="hidden" {...register("adType")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="adType">Tipo de Anúncio</Label>
            <Select defaultValue="FINANCIAL_PRODUCTS_AND_SERVICES_ADS" onValueChange={(value) => register("adType").onChange({ target: { value } })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de anúncio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FINANCIAL_PRODUCTS_AND_SERVICES_ADS">Produtos e Serviços Financeiros</SelectItem>
                <SelectItem value="HOUSING_ADS">Imóveis</SelectItem>
                <SelectItem value="EMPLOYMENT_ADS">Empregos</SelectItem>
                <SelectItem value="POLITICAL_AND_ISSUE_ADS">Políticos e de Interesse Público</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Pesquisando...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Pesquisar Anúncios
            </>
          )}
        </Button>
      </form>

      {error && (
        <div className="p-4 text-red-500 bg-red-50 rounded-md">
          <h3 className="font-bold mb-2">Erro:</h3>
          <p>{error}</p>
        </div>
      )}

      {results.length > 0 && <AdResults ads={results} totalAds={totalAds} />}
    </div>
  )
}

