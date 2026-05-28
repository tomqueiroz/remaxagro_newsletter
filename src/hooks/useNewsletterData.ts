/**
 * useNewsletterData
 * Hook centralizado que fornece todos os dados da newsletter.
 * - Em produção, substitua as funções fetch* por chamadas reais à API/DATAGRO.
 * - Os dados são cacheados no localStorage e renovados toda segunda-feira.
 */

import { useMemo } from "react";
import {
  quotations,
  allNews,
  insights,
  brokers,
} from "@/mocks/newsletter";

export interface QuotationItem {
  id: number;
  name: string;
  value: string;
  unit: string;
  change: number;
  description: string;
  unitLabel: string;
}

export interface NewsItem {
  id: number;
  date: string;
  dateLabel: string;
  icon: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  image: string;
}

export interface InsightItem {
  id: number;
  title: string;
  description: string;
  date: string;
  urgency: string;
}

export interface BrokerItem {
  id: number;
  name: string;
  role: string;
  region: string;
  whatsapp: string;
}

export interface NewsletterData {
  editionNumber: string;
  editionDate: string;
  quotations: QuotationItem[];
  mainNews: NewsItem[];
  secondaryNews: NewsItem[];
  insights: InsightItem[];
  brokers: BrokerItem[];
  lastUpdated: string;
}

/** Retorna a data da última segunda-feira (ou hoje se for segunda) */
function getLastMonday(): Date {
  const today = new Date();
  const day = today.getDay(); // 0=Dom, 1=Seg...
  const diff = day === 0 ? 6 : day - 1;
  const monday = new Date(today);
  monday.setDate(today.getDate() - diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function getEditionNumber(): string {
  const launch = new Date("2026-04-18");
  const monday = getLastMonday();
  const diffMs = monday.getTime() - launch.getTime();
  const weeks = Math.max(1, Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000)) + 1);
  return String(weeks).padStart(3, "0");
}

const CACHE_KEY = "remax_agro_newsletter_data_v2";

function loadFromCache(): NewsletterData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw) as NewsletterData & { _cachedAt: string };
    const cachedAt = new Date(cached._cachedAt);
    const lastMonday = getLastMonday();
    if (cachedAt >= lastMonday) return cached;
    return null;
  } catch {
    return null;
  }
}

function saveToCache(data: NewsletterData): void {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ ...data, _cachedAt: new Date().toISOString() })
    );
  } catch {
    // silently fail
  }
}

export function useNewsletterData(): NewsletterData {
  return useMemo(() => {
    const cached = loadFromCache();
    if (cached) return cached;

    const monday = getLastMonday();
    const news: NewsItem[] = allNews.map((n) => ({
      id: n.id,
      date: n.date,
      dateLabel: n.dateLabel,
      icon: n.icon,
      title: n.title,
      summary: n.summary,
      source: n.source,
      url: n.url,
      image: n.image,
    }));

    const data: NewsletterData = {
      editionNumber: getEditionNumber(),
      editionDate: formatDate(monday),
      quotations: quotations.map((q) => ({
        id: q.id,
        name: q.name,
        value: q.value,
        unit: q.unit,
        change: q.change,
        description: q.description,
        unitLabel: q.unitLabel,
      })),
      mainNews: news.slice(0, 6),
      secondaryNews: news.slice(6),
      insights: insights.map((i) => ({
        id: i.id,
        title: i.title,
        description: i.description,
        date: i.date,
        urgency: i.urgency,
      })),
      brokers: brokers.map((b) => ({
        id: b.id,
        name: b.name,
        role: b.role,
        region: b.region,
        whatsapp: b.whatsapp,
      })),
      lastUpdated: new Date().toLocaleDateString("pt-BR"),
    };

    saveToCache(data);
    return data;
  }, []);
}
