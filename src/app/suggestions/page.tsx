import { type Suggestion } from '@/lib/types';

type SuggestionProps = {
  indice: number;
  suggestion: Suggestion;
};

function SuggestionCard({ indice }: SuggestionProps) {
  return (
    <div
      style={{
        gridArea: `${Math.floor((indice + 1) / 4)} ${(indice % 4) + 1} ${Math.floor((indice + 1) / 4) + 1} ${(indice % 4) + 2}`,
      }}
      className='bg-blue-50 h-80'
    >
      {indice}
    </div>
  );
}

export default function Suggestions() {
  const suggestions: Array<Suggestion> = [];

  for (let i = 0; i < 4; i++) {
    suggestions.push({
      name: 'Attention is all you need',
      type: 'article',
      by: 'Maël Reynaud',
      date: new Date(21, 9, 2024),
      isAuthor: true,
      link: 'https://arxiv.org/pdf/1706.03762',
      summary:
        'Article presenting a new architecture called Transformer which uses attention mechanism.',
    } as Suggestion);
  }

  return (
    <div
      className={`grid grid-cols-4 grid-rows-${Math.ceil(suggestions.length / 4)} gap-6 pad-5 bg-gray-200 p-5`}
    >
      {suggestions.map((suggestion, i) => {
        return (
          <SuggestionCard
            key={`suggestion_${i}`}
            indice={i}
            suggestion={suggestion}
          />
        );
      })}
    </div>
  );
}

/*

.div1 { grid-area: 1 / 1 / 2 / 2; }
.div2 { grid-area: 1 / 2 / 2 / 3; }
.div3 { grid-area: 1 / 3 / 2 / 4; }
.div4 { grid-area: 1 / 4 / 2 / 5; }

.div5 { grid-area: 2 / 1 / 3 / 2; }
.div6 { grid-area: 2 / 2 / 3 / 3; }
.div7 { grid-area: 2 / 3 / 3 / 4; }
.div8 { grid-area: 2 / 4 / 3 / 5; }

.div9 { grid-area: 3 / 1 / 4 / 2; }
.div10 { grid-area: 3 / 2 / 4 / 3; }
.div11 { grid-area: 3 / 3 / 4 / 4; }
.div12 { grid-area: 3 / 4 / 4 / 5; }

.div13 { grid-area: 4 / 1 / 5 / 2; }
.div14 { grid-area: 4 / 2 / 5 / 3; }
.div15 { grid-area: 4 / 3 / 5 / 4; }
.div16 { grid-area: 4 / 4 / 5 / 5; }

.div17 { grid-area: 5 / 1 / 6 / 2; }
.div18 { grid-area: 5 / 2 / 6 / 3; }
.div19 { grid-area: 5 / 3 / 6 / 4; }
.div20 { grid-area: 5 / 4 / 6 / 5; }
*/
