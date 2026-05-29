import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TextEffectFour, TextEffectOne, TextEffectTwo } from "react-text-animate";
import { slides } from "./slides";
import type { Slide } from "./slides";

type SfxKey = (typeof slides)[number]["sfx"];

const fallbackSfx: SfxKey = "scan-beeps";

function tone(ctx: AudioContext, start: number, frequency: number, duration: number, gainValue: number, type: OscillatorType = "sine") {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.001, start);
  gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

function sweep(ctx: AudioContext, start: number, from: number, to: number, duration: number, gainValue: number, type: OscillatorType = "sine") {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(from, start);
  osc.frequency.exponentialRampToValueAtTime(to, start + duration);
  gain.gain.setValueAtTime(0.001, start);
  gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.03);
}

function noise(ctx: AudioContext, start: number, duration: number, gainValue: number) {
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  }
  const source = ctx.createBufferSource();
  const gain = ctx.createGain();
  source.buffer = buffer;
  gain.gain.setValueAtTime(gainValue, start);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
  source.connect(gain).connect(ctx.destination);
  source.start(start);
  source.stop(start + duration);
}

export function App() {
  const [index, setIndex] = useState(0);
  const [sound, setSound] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [compactText, setCompactText] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastTapRef = useRef(0);
  const current = slides[index];
  const progress = ((index + 1) / slides.length) * 100;

  const playSfx = useCallback(
    (key: SfxKey) => {
      if (!sound) return;
      const ctx = audioCtxRef.current ?? new AudioContext();
      audioCtxRef.current = ctx;
      if (ctx.state === "suspended") void ctx.resume();
      const t = ctx.currentTime + 0.01;

      switch (key) {
        case "secure-open":
          sweep(ctx, t, 180, 620, 0.34, 0.08, "triangle");
          tone(ctx, t + 0.25, 932, 0.16, 0.055);
          break;
        case "risk-alert":
          tone(ctx, t, 220, 0.16, 0.07, "sawtooth");
          tone(ctx, t + 0.18, 185, 0.18, 0.065, "sawtooth");
          noise(ctx, t + 0.05, 0.22, 0.045);
          break;
        case "legal-hit":
          tone(ctx, t, 146, 0.22, 0.09, "square");
          tone(ctx, t + 0.06, 292, 0.18, 0.045, "triangle");
          break;
        case "check-sequence":
          [660, 880, 1175].forEach((freq, idx) => tone(ctx, t + idx * 0.08, freq, 0.1, 0.042));
          break;
        case "reject-buzz":
          tone(ctx, t, 126, 0.22, 0.07, "sawtooth");
          tone(ctx, t + 0.1, 94, 0.2, 0.06, "square");
          break;
        case "split-route":
          sweep(ctx, t, 360, 760, 0.18, 0.045, "triangle");
          sweep(ctx, t + 0.06, 760, 340, 0.2, 0.04, "triangle");
          break;
        case "shred-vortex":
          noise(ctx, t, 0.36, 0.08);
          sweep(ctx, t + 0.02, 920, 160, 0.34, 0.05, "sawtooth");
          break;
        case "degauss-pulse":
          sweep(ctx, t, 72, 42, 0.42, 0.11, "sine");
          tone(ctx, t + 0.08, 54, 0.32, 0.08, "triangle");
          break;
        case "login-unlock":
          tone(ctx, t, 520, 0.08, 0.045);
          tone(ctx, t + 0.09, 784, 0.1, 0.05);
          tone(ctx, t + 0.22, 1046, 0.12, 0.05);
          break;
        case "scan-beeps":
          [740, 740, 990, 1260].forEach((freq, idx) => tone(ctx, t + idx * 0.055, freq, 0.045, 0.035, "square"));
          break;
        case "zero-complete":
          sweep(ctx, t, 420, 90, 0.25, 0.045, "triangle");
          tone(ctx, t + 0.26, 880, 0.16, 0.055);
          break;
        case "exception-review":
          tone(ctx, t, 392, 0.11, 0.04);
          tone(ctx, t + 0.11, 523, 0.11, 0.04);
          tone(ctx, t + 0.26, 330, 0.18, 0.035, "triangle");
          break;
        case "mistake-alert":
          tone(ctx, t, 311, 0.12, 0.065, "square");
          tone(ctx, t + 0.13, 233, 0.14, 0.06, "square");
          break;
        case "incident-stop":
          tone(ctx, t, 196, 0.28, 0.08, "triangle");
          noise(ctx, t + 0.02, 0.12, 0.035);
          break;
        case "golden-rise":
          [392, 587, 784, 1175].forEach((freq, idx) => tone(ctx, t + idx * 0.07, freq, 0.18, 0.042));
          break;
        case "final-chime":
          tone(ctx, t, 523, 0.28, 0.04);
          tone(ctx, t + 0.08, 784, 0.36, 0.045);
          tone(ctx, t + 0.18, 1046, 0.42, 0.035);
          break;
      }
    },
    [sound],
  );

  const goTo = useCallback(
    (nextIndex: number, cue: SfxKey = fallbackSfx) => {
      setIndex((prev) => {
        const bounded = Math.max(0, Math.min(slides.length - 1, nextIndex));
        if (bounded !== prev) playSfx(cue);
        return bounded;
      });
    },
    [playSfx],
  );

  const next = useCallback(() => goTo(index + 1, slides[Math.min(index + 1, slides.length - 1)].sfx), [goTo, index]);
  const previous = useCallback(() => goTo(index - 1, "split-route"), [goTo, index]);
  const first = useCallback(() => goTo(0, "secure-open"), [goTo]);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen().catch(() => undefined);
    } else {
      await document.exitFullscreen().catch(() => undefined);
    }
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px) and (orientation: portrait)");
    const update = () => setCompactText(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === "escape") return;
      if (key === "enter" || key === "f") {
        event.preventDefault();
        void toggleFullscreen();
        return;
      }
      if (key === "arrowleft" || key === "pageup") {
        event.preventDefault();
        previous();
        return;
      }
      if (key === "home") {
        event.preventDefault();
        first();
        return;
      }
      if (key === "end") {
        event.preventDefault();
        goTo(slides.length - 1, "final-chime");
        return;
      }
      if (key === "arrowright" || key === "pagedown" || key === " " || isFullscreen) {
        event.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [first, goTo, isFullscreen, next, previous, toggleFullscreen]);

  const sectionLabel = useMemo(() => `${current.section} · ${String(index + 1).padStart(2, "0")}/${slides.length}`, [current.section, index]);

  const onTouchStart = useCallback((event: React.TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
  }, []);

  const onTouchEnd = useCallback(
    (event: React.TouchEvent<HTMLElement>) => {
      const now = Date.now();
      if (isFullscreen && now - lastTapRef.current < 320) {
        event.preventDefault();
        lastTapRef.current = 0;
        void document.exitFullscreen().catch(() => undefined);
        return;
      }
      lastTapRef.current = now;

      const start = touchStartRef.current;
      const touch = event.changedTouches[0];
      touchStartRef.current = null;
      if (!isFullscreen || !start || !touch) return;

      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      const elapsed = now - start.time;
      if (elapsed > 700 || Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.25) return;

      event.preventDefault();
      if (dx < 0) {
        next();
      } else {
        previous();
      }
    },
    [isFullscreen, next, previous],
  );

  return (
    <main className={isFullscreen ? "app fullscreen" : "app"}>
      <section
        className="stage"
        onClick={() => (isFullscreen ? next() : undefined)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-live="polite"
      >
        <div className="progress" style={{ width: `${progress}%` }} />
        <SlideView key={current.id} slideIndex={index} compactText={compactText} />
        <div className="slide-footer">
          <span>{sectionLabel}</span>
          <span>{current.eyebrow}</span>
        </div>
      </section>

      <aside className="control-panel" aria-label="발표 조작 패널">
        <div>
          <p className="panel-kicker">발표 모드</p>
          <h1>개인정보보호 연수</h1>
          <p>{index + 1}번째 장면을 표시 중입니다.</p>
        </div>
        <div className="button-grid">
          <button type="button" onClick={first}>처음</button>
          <button type="button" onClick={previous}>이전</button>
          <button type="button" onClick={next}>다음</button>
          <button type="button" onClick={toggleFullscreen}>전체화면</button>
        </div>
        <label className="sound-toggle">
          <input type="checkbox" checked={sound} onChange={(event) => setSound(event.target.checked)} />
          효과음 사용
        </label>
        <ol className="thumb-list">
          {slides.map((slide, slideIndex) => (
            <li key={slide.id}>
              <button className={slideIndex === index ? "active" : ""} type="button" onClick={() => goTo(slideIndex, slide.sfx)}>
                <span>{String(slideIndex + 1).padStart(2, "0")}</span>
                {slide.title}
              </button>
            </li>
          ))}
        </ol>
      </aside>
    </main>
  );
}

function SlideView({ slideIndex, compactText }: { slideIndex: number; compactText: boolean }) {
  const slide = slides[slideIndex];

  return (
    <article className={`slide ${slide.kind} slide-${slide.id} fx-${slide.textFx ?? "surge"}`}>
      {slide.backdrop ? <img className="generated-backdrop" src={slide.backdrop} alt="" aria-hidden="true" /> : null}
      <div className="background-grid" />
      <div className="motion-waves" aria-hidden="true" />
      <header className="slide-header">
        <div className="school-identity">
          <img src="/assets/school_emblem.svg" alt="영락의료과학고등학교 교표" />
          <span>{slide.eyebrow}</span>
        </div>
      </header>
      <div className="slide-body">
        <div className="copy">
          <AnimatedTitle slide={slide} compactText={compactText} />
          {slide.subtitle ? <p className="subtitle">{slide.subtitle}</p> : null}
          {slide.bullets ? <BulletBlock bullets={slide.bullets} kind={slide.kind} fx={slide.textFx ?? "surge"} /> : null}
          {slide.tags ? <TagRow tags={slide.tags} /> : null}
        </div>
        <Visual slideIndex={slideIndex} />
      </div>
    </article>
  );
}

function AnimatedTitle({ slide, compactText }: { slide: Slide; compactText: boolean }) {
  const lines = slide.title.split("\n");
  const className = `animated-title title-${slide.id}`;
  const titleShellClass = `title-fx-shell title-mode-${slide.id}`;

  if (compactText) {
    return (
      <div className={titleShellClass} data-title={slide.title}>
        <h2 className={className}>{slide.title}</h2>
      </div>
    );
  }

  if (["opening", "law", "provision-consignment", "degaussing", "golden-actions", "outro"].includes(slide.id)) {
    return (
      <div className={titleShellClass} data-title={slide.title}>
        <TextEffectOne
          wrapperElement="h2"
          text={lines}
          className={className}
          lineHeight={1.12}
          staggerDuration={slide.id === "law" ? 0.055 : 0.035}
          rotation={slide.id === "law" ? -4 : slide.id === "golden-actions" ? 5 : 0}
          fromTop={slide.id === "degaussing"}
          wordByWord={slide.id === "law" || slide.id === "golden-actions"}
          animateOnce
        />
      </div>
    );
  }

  if (["collection", "apm-dashboard", "apm-encrypt", "apm-exception"].includes(slide.id)) {
    return (
      <div className={titleShellClass} data-title={slide.title}>
        <TextEffectFour
          wrapperElement="h2"
          text={slide.title}
          className={className}
          fromCenter={slide.id === "collection"}
          staggerDuration={0.035}
          cursorConfig={{
            type: slide.id === "apm-encrypt" ? "horizontal" : "vertical",
            color: slide.id === "collection" ? "#27e0b2" : "#f3c94b",
            width: "4px",
            blinkRate: 0.42,
            marginLeft: "6px",
          }}
          animateOnce
        />
      </div>
    );
  }

  return (
    <div className={titleShellClass} data-title={slide.title}>
      <TextEffectTwo
        wrapperElement="h2"
        text={slide.title}
        className={className}
        filter
        animationDuration={slide.id === "impact" || slide.id === "mistakes" ? 0.055 : 0.08}
        staggerDuration={slide.id === "destruction" ? 0.018 : 0.03}
        animateOnce
      />
    </div>
  );
}

function BulletBlock({ bullets, kind, fx }: { bullets: string[]; kind: string; fx: string }) {
  if (kind === "compare") {
    return (
      <div className="compare-grid">
        {bullets.map((bullet) => {
          const [label, detail] = bullet.split(": ");
          return (
            <div className={`compare-card fx-item-${indexMod(bullet)}`} key={bullet}>
              <strong>{label}</strong>
              <p>{detail}</p>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <ul className="bullet-list">
      {bullets.map((bullet, idx) => (
        <li className={`fx-item-${(idx % 4) + 1} fx-${fx}`} key={bullet}>
          <span>{String(idx + 1).padStart(2, "0")}</span>
          {bullet}
        </li>
      ))}
    </ul>
  );
}

function TagRow({ tags }: { tags: string[] }) {
  return (
    <div className="tag-row">
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}

function Visual({ slideIndex }: { slideIndex: number }) {
  const slide = slides[slideIndex];
  const elementClassName = slide.element?.includes("opening_core")
    ? "foreground-element screen-object"
    : "foreground-element";
  if (slide.asset) {
    return (
      <div className="asset-frame">
        <img src={slide.asset} alt={slide.alt ?? ""} />
        {slide.element ? <img className={`${elementClassName} mini`} src={slide.element} alt={slide.elementAlt ?? ""} /> : null}
        <div className="asset-scan" aria-hidden="true" />
        <div className="asset-sparks" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }

  if (slide.backdrop) {
    return (
      <div className="generated-panel" aria-hidden="true">
        {slide.element ? <img className={elementClassName} src={slide.element} alt={slide.elementAlt ?? ""} /> : null}
        <span />
        <span />
        <span />
      </div>
    );
  }

  if (slide.kind === "law") {
    return (
      <div className="penalty-meter">
        <strong>5년</strong>
        <span>또는</span>
        <strong>5,000만원</strong>
      </div>
    );
  }

  if (slide.kind === "actions") {
    return (
      <div className="action-rings">
        <span>확인</span>
        <span>잠금</span>
        <span>삭제</span>
      </div>
    );
  }

  return (
    <div className="visual-system">
      <div className="shield">보호</div>
      <div className="scan-line" />
      <div className="data-nodes">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function indexMod(value: string) {
  return (value.length % 4) + 1;
}
