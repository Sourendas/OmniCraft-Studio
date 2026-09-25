import React from 'react';
import { Link } from 'react-router-dom';
import { getToolArticle } from '../../data/toolArticles';
import { PDF_TOOL_ARTICLES, type ToolArticleWithGuides } from '../../data/toolArticlesPdf';

export const ToolArticle: React.FC<{ slug: string }> = ({ slug }) => {
  const article: ToolArticleWithGuides | undefined = getToolArticle(slug) ?? PDF_TOOL_ARTICLES[slug];
  if (!article) return null;

  return (
    <article className="max-w-3xl mx-auto mt-12 mb-16 px-4 sm:px-6 text-[#0A2540]">
      <div className="rounded-3xl bg-white border border-orange-100 p-6 sm:p-10 space-y-6 text-sm sm:text-[15px] leading-relaxed text-stone-700">
        <h2 className="text-xl sm:text-2xl font-black text-[#1C1917] tracking-tight">{article.title}</h2>
        <p>{article.lede}</p>
        <h3 className="text-base font-black text-[#1C1917]">Who this is for</h3>
        <ul className="list-disc pl-5 space-y-1">
          {article.forWho.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h3 className="text-base font-black text-[#1C1917]">Who this is not for</h3>
        <ul className="list-disc pl-5 space-y-1">
          {article.notFor.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h3 className="text-base font-black text-[#1C1917]">How to use it</h3>
        <ol className="list-decimal pl-5 space-y-3">
          {article.steps.map((step) => (
            <li key={step.title}>
              <strong className="text-[#1C1917]">{step.title}.</strong> {step.body}
            </li>
          ))}
        </ol>
        <h3 className="text-base font-black text-[#1C1917]">Limits</h3>
        <ul className="list-disc pl-5 space-y-1">
          {article.limits.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h3 className="text-base font-black text-[#1C1917]">Questions</h3>
        <dl className="space-y-3">
          {article.faq.map((item) => (
            <div key={item.q}>
              <dt className="font-black text-[#1C1917]">{item.q}</dt>
              <dd className="mt-1">{item.a}</dd>
            </div>
          ))}
        </dl>
        {article.guides && article.guides.length > 0 && (
          <>
            <h3 className="text-base font-black text-[#1C1917]">Related guides</h3>
            <ul className="list-disc pl-5 space-y-1">
              {article.guides.map((guide) => (
                <li key={guide.slug}>
                  <Link className="text-[#C2410C] font-bold underline" to={`/guides/${guide.slug}`}>
                    {guide.label}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
        <p>
          Operator: Souren Das, Bengaluru. Guides:{' '}
          <Link className="text-[#C2410C] font-bold underline" to="/guides">
            filetoolskit.com/guides
          </Link>
          . Privacy:{' '}
          <Link className="text-[#C2410C] font-bold underline" to="/privacy">
            Privacy
          </Link>
          . Support:{' '}
          <a className="text-[#C2410C] font-bold underline" href="mailto:support@filetoolskit.com">
            support@filetoolskit.com
          </a>
          .
        </p>
      </div>
    </article>
  );
};
