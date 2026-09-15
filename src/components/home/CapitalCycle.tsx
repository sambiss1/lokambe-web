import type {HomeContent} from '@/content/types';
import {Reveal} from '../motion/Reveal';
import {Container} from '../ui/Container';
import {Eyebrow} from '../ui/Eyebrow';
import {Logo} from '../ui/Logo';

const SIZE = 520;
const CENTER = SIZE / 2;
const RADIUS = 200;

export function CapitalCycle({functions}: {functions: HomeContent['functions']}) {
  const nodes = functions.cycle.map((label, index) => {
    const angle = (index / functions.cycle.length) * Math.PI * 2 - Math.PI / 2;
    return {label, x: CENTER + RADIUS * Math.cos(angle), y: CENTER + RADIUS * Math.sin(angle)};
  });

  return (
    <section className="relative overflow-hidden bg-lokambe-peach-soft py-24 sm:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow className="text-ink-soft">{functions.eyebrow}</Eyebrow>
            <h2 className="display mt-5 text-[clamp(2.4rem,5.2vw,4.75rem)] text-lokambe-blue">{functions.title}</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">{functions.intro}</p>
          </Reveal>

          <ul className="mt-12 space-y-3">
            {functions.items.map((item, index) => (
              <Reveal
                as="li"
                key={item.title}
                index={index}
                className="group rounded-[1.75rem] bg-white p-6 transition-colors duration-300 hover:bg-lokambe-blue sm:p-7"
              >
                <h3 className="flex items-center gap-3 text-2xl font-extrabold text-lokambe-blue uppercase transition-colors group-hover:text-white">
                  <span className="h-2.5 w-2.5 rounded-full bg-lokambe-red transition-[width] duration-300 group-hover:w-6" />
                  {item.title}
                </h3>
                <p className="mt-2 text-lg leading-relaxed text-ink-soft transition-colors group-hover:text-white/85">
                  {item.text}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal index={1} className="relative mx-auto w-[74%] max-w-[30rem] sm:w-full">
          <figure>
            <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full overflow-visible" role="img" aria-labelledby="cycle-title">
              <title id="cycle-title">{`${functions.cycleLabel} : ${functions.cycle.join(', ')}`}</title>
              <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="#f7c4a7" strokeWidth="34" />
              <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                fill="none"
                stroke="#001df3"
                strokeWidth="34"
                strokeLinecap="round"
                strokeDasharray="160 1097"
                className="origin-center animate-orbit motion-reduce:animate-none"
                style={{transformBox: 'view-box'}}
              />
              <circle cx={CENTER} cy={CENTER} r="128" fill="#ffffff" />
              {nodes.map((node, index) => (
                <g key={node.label}>
                  <circle cx={node.x} cy={node.y} r="11" fill={index === nodes.length - 1 ? '#f01346' : '#0a0a0a'} />
                </g>
              ))}
            </svg>
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <Logo tone="blue" className="w-[36%]" />
            </div>
            {nodes.map((node) => {
              const left = (node.x / SIZE) * 100;
              const top = (node.y / SIZE) * 100;
              const onRight = node.x > CENTER + 10;
              const onLeft = node.x < CENTER - 10;
              return (
                <span
                  key={node.label}
                  aria-hidden="true"
                  className="absolute rounded-full bg-white px-2.5 py-1 text-xs font-extrabold sm:px-3.5 sm:py-1.5 whitespace-nowrap text-lokambe-blue uppercase shadow-[0_10px_30px_-12px_rgba(0,18,168,0.45)] sm:text-base"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    transform: `translate(${onRight ? '18%' : onLeft ? '-118%' : '-50%'}, ${node.y < CENTER ? '-135%' : '35%'})`,
                  }}
                >
                  {node.label}
                </span>
              );
            })}
            <figcaption className="sr-only">{functions.cycleLabel}</figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
