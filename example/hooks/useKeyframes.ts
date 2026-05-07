import * as React from 'react';

const findKeyframesText = (name: string): string => {
  if (typeof document === 'undefined') return '';
  for (let i = 0; i < document.styleSheets.length; i++) {
    let rules: CSSRuleList | null = null;
    try {
      rules = document.styleSheets[i].cssRules;
    } catch {
      continue;
    }
    if (!rules) continue;
    for (let j = 0; j < rules.length; j++) {
      const rule = rules[j];
      if (rule instanceof CSSKeyframesRule && rule.name === name) {
        return rule.cssText;
      }
    }
  }
  return `/* @keyframes ${name} not found in loaded stylesheets */`;
};

export const useKeyframes = (name: string): string => {
  const [text, setText] = React.useState('');
  React.useEffect(() => {
    setText(findKeyframesText(name));
  }, [name]);
  return text;
};
