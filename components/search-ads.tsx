'use client'

import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger,SelectValue } from "@/components/ui/select"
import { AdResults } from "./ad-results"
import { Search, Loader2 } from 'lucide-react'
import { useSession } from "next-auth/react"

interface SearchForm {
  searchTerm: string
  adType: string
}

export function SearchAds({ isVip = false }) {
  const [pageGroups, setPageGroups] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { data: session } = useSession()

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
        body: JSON.stringify({ ...data, isVip }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Falha ao buscar anúncios')
      }

      setPageGroups(result.data)
      setTotalPages(result.totalPages)
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

      {error && <p className="text-red-500">{error}</p>}

      {pageGroups.length > 0 && (
        <AdResults pageGroups={pageGroups} totalPages={totalPages} isVIP={isVip} />
      )}

      {!isVip && (
        <div className="mt-8 p-4 bg-yellow-100 rounded-lg">
          <p className="text-yellow-800">
            Você está usando a versão gratuita. <a href="/upgrade" className="font-bold underline">Faça upgrade para VIP</a> para acessar mais recursos e resultados detalhados!
          </p>
        </div>
      )}
    </div>
  )
}

