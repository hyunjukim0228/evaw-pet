"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { faqs } from "@/lib/faq";

// FAQ 아코디언 — 2026-09-16 스펙: Radix Accordion type="single" collapsible(한 번에 하나만 열림),
// 높이 트랜지션 smooth, chevron 180도 회전. 접근성(aria)은 Radix 기본 제공.
export default function FaqSection() {
  return (
    <Accordion.Root type="single" collapsible className="faq-list">
      {faqs.map((item, i) => (
        <Accordion.Item key={item.q} value={`faq-${i}`} className="faq-item">
          <Accordion.Header>
            <Accordion.Trigger className="faq-trigger">
              <span>{item.q}</span>
              <svg className="faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="faq-content">
            <p>{item.a}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
