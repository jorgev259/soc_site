import type { ReactNode } from "react";

interface i18nParams {
  locale: string
}

export interface LayoutContext<Params = {}> {
  params: i18nParams & Params
  children: ReactNode
}

export interface PageContext<Params = {}> {
  params: i18nParams & Params
  searchParams?: { [key: string]: string | string[] | undefined }
}