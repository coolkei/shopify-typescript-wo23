import type Key from '../keys';
import type {HeldKey} from '../keys';

import useShortcut, {DefaultIgnoredTag} from './hooks';

export interface Props {
  ordered: Key[];
  held?: HeldKey;
  node?: HTMLElement | null;
  ignoreInput?: boolean;
  acceptedDefaultIgnoredTags?: DefaultIgnoredTag[];
  onMatch(matched: {ordered: Key[]; held?: HeldKey}): void;
  allowDefault?: boolean;
}

export default function Shortcut(props: Props) {
  const {ordered, onMatch, ...rest} = props;

  useShortcut(ordered, onMatch, {...rest});

  return null;
}
