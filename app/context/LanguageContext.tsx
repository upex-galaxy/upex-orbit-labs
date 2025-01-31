/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type Language = 'en' | 'es'

interface Translations {
  en: any
  es: any
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const [translations, setTranslations] = useState<Translations | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const [enTranslation, esTranslation] = await Promise.all([
          import('../data/EN-language.json'),
          import('../data/ES-language.json')
        ])
        
        setTranslations({
          en: enTranslation.default,
          es: esTranslation.default
        })
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading translations:', error)
        setIsLoading(false)
      }
    }
    loadTranslations()
  }, [])

  const t = (key: string): string => {
    if (!translations) return key

    const keys = key.split('.')
    let current: any = translations[language]
    
    if (!current) return key
    
    for (const k of keys) {
      current = current[k]
      if (current === undefined) return key
    }
    
    return current
  }

  if (isLoading) {
    return <div>Loading translations...</div>
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}