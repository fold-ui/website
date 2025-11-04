import * as data from '@/dummy-data'
import {
    Attachment,
    Avatar,
    Button,
    ButtonGroup,
    Card,
    ColorPicker,
    Copy,
    DarkModeButton,
    DarkModeToggle,
    DatePickerProvider,
    Divider,
    Heading,
    Icon,
    IconLib,
    Image,
    Link,
    Menu,
    MenuItemOption,
    MenuOptionGroup,
    Option,
    Options,
    Palette,
    Pill,
    Range,
    ScrollingDatePicker,
    Select,
    Sparkline,
    Stack,
    Tab,
    TabList,
    Tabs,
    Text,
    Timeline,
    TimelineItem,
    View,
    documentObject,
    timezones,
    useCopy,
    useScrollingDatePicker
} from '@fold-dev/core'
import * as Token from '@fold-dev/design/tokens'
import { useEffect, useMemo, useRef, useState } from 'react'
import { PiCompassTool } from 'react-icons/pi'
import CodeComponent, { highlightCode } from './code.component'
import { GraphicLeft } from './graphic.component'

const ScrollingPicker = () => {
    const { goToToday } = useScrollingDatePicker()
    const ref = useRef(null)
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const { today, tomorrow, start, end } = useMemo(() => {
        const today = new Date()
        const tomorrow = new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000)
        const start = new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000)
        const end = new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000)
        return {
            today,
            tomorrow,
            start,
            end,
        }
    }, [])
    const [selection, setSelection] = useState<any[]>([[start, end]])

    const handleSelection = (date: Date) => {
        if (selection.length == 0) {
            setSelection([[date, null]])
        } else {
            const selected = selection[0]
            if (!selected[0]) return setSelection([date, null])
            if (!!selected[0] && !!selected[1]) return setSelection([[date, null]])
            if (!!selected[0] && !selected[1])
                return setSelection(selected[0] > date ? [[date, selected[0]]] : [[selected[0], date]])
        }
    }

    const handleTodayClick = (e) => {
        goToToday(ref.current)
    }

    return (
        <View width={300}>
            <DatePickerProvider>
                <ScrollingDatePicker
                    height={300}
                    ref={ref}
                    defaultDate={today}
                    selection={selection}
                    onChange={handleSelection}
                    monthTitle={(date: Date) => (
                        <Text
                            p="1rem"
                            as="span"
                            width="100%">
                            {monthNames[date.getMonth()]} / {date.getFullYear()}
                        </Text>
                    )}
                />
            </DatePickerProvider>
        </View>
    )
}

export const colors = {
    purple: `
    :root {
        --f-color-accent-50: #faf5ff;
        --f-color-accent-100: #e9d8fd;
        --f-color-accent-200: #d6bcfa;
        --f-color-accent-300: #b794f4;
        --f-color-accent-400: #9f7aea;
        --f-color-accent-500: #805ad5;
        --f-color-accent-600: #6b46c1;
        --f-color-accent-700: #553c9a;
        --f-color-accent-800: #44337a;
        --f-color-accent-900: #322659;
    }
    [data-theme='light'] {
        --f-focus: 3px solid #a2cdff;
        --f-color-background: #f7fafc;
        --f-color-accent: #0078ff;
        --f-color-accent-subtle: #7ab8ff80;
        --f-color-accent-strong: #0063d1;
        --f-color-accent-weak: #b9daff;
        --f-color-success: #38b2ac;
        --f-color-success-subtle: #4fd1c580;
        --f-color-success-strong: #2c7a7b;
        --f-color-success-weak: #b2f5ea;
        --f-color-neutral: #a0aec0;
        --f-color-neutral-subtle: #cbd5e080;
        --f-color-neutral-strong: #4a5568;
        --f-color-neutral-weak: #f0f5fa;
        --f-color-caution: #ecc94b;
        --f-color-caution-subtle: #f6e05e80;
        --f-color-caution-strong: #b7791f;
        --f-color-caution-weak: #fefcbf;
        --f-color-warning: #ed8936;
        --f-color-warning-subtle: #f6ad5580;
        --f-color-warning-strong: #c05621;
        --f-color-warning-weak: #feebc8;
        --f-color-danger: #f56565;
        --f-color-danger-subtle: #fc818180;
        --f-color-danger-strong: #c53030;
        --f-color-danger-weak: #fed7d7;
        --f-color-highlight: #9f7aea;
        --f-color-highlight-subtle: #d6bcfa80;
        --f-color-highlight-strong: #6b46c1;
        --f-color-highlight-weak: #e9d8fd;
        --f-color-text: #2d3748;
        --f-color-text-weak: #4a5568;
        --f-color-text-weaker: #718096;
        --f-color-text-weakest: #cbd5e0;
        --f-color-text-link: #0078ff;
        --f-color-text-on-color: #ffffff;
        --f-color-surface: #ffffff;
        --f-color-surface-strong: #f7fafc;
        --f-color-surface-stronger: #f0f5fa;
        --f-color-surface-strongest: #e2e8f0;
        --f-color-surface-highlight: #b9daff;
        --f-color-surface-inverse: #2d3748;
        --f-color-border: #e2e8f0;
        --f-color-border-strong: #cbd5e0;
        }
        [data-theme='dark'] {
            --f-focus: 3px solid #0063d1;
            --f-color-background: #171923;
            --f-color-accent: #2e90ff;
            --f-color-accent-subtle: #0063d180;
            --f-color-accent-strong: #7ab8ff;
            --f-color-accent-weak: #002c5c;
            --f-color-success: #38b2ac;
            --f-color-success-subtle: #2c7a7b80;
            --f-color-success-strong: #4fd1c5;
            --f-color-success-weak: #1d4044;
            --f-color-neutral: #a0aec0;
            --f-color-neutral-subtle: #4a556880;
            --f-color-neutral-strong: #cbd5e0;
            --f-color-neutral-weak: #171923;
            --f-color-caution: #ecc94b;
            --f-color-caution-subtle: #b7791f80;
            --f-color-caution-strong: #f6e05e;
            --f-color-caution-weak: #5f370e;
            --f-color-warning: #ed8936;
            --f-color-warning-subtle: #c0562180;
            --f-color-warning-strong: #f6ad55;
            --f-color-warning-weak: #652b19;
            --f-color-danger: #f56565;
            --f-color-danger-subtle: #c5303080;
            --f-color-danger-strong: #fc8181;
            --f-color-danger-weak: #63171b;
            --f-color-highlight: #9f7aea;
            --f-color-highlight-subtle: #6b46c180;
            --f-color-highlight-strong: #b794f4;
            --f-color-highlight-weak: #322659;
            --f-color-text: #f0f5fa;
            --f-color-text-weak: #cbd5e0;
            --f-color-text-weaker: #a0aec0;
            --f-color-text-weakest: #4a5568;
            --f-color-text-link: #2e90ff;
            --f-color-text-on-color: #000000;
            --f-color-surface: #171923;
            --f-color-surface-strong: #1a202c;
            --f-color-surface-stronger: #2d3748;
            --f-color-surface-strongest: #718096;
            --f-color-surface-highlight: #003c7e;
            --f-color-surface-inverse: #a0aec0;
            --f-color-border: #2d3748;
            --f-color-border-strong: #4a5568;
    }
`,
    neonpink: `
:root {
    --f-color-accent-50: #ffd6e4;
    --f-color-accent-100: #ffb9c6;
    --f-color-accent-200: #ffa2bc;
    --f-color-accent-300: #ff7aba;
    --f-color-accent-400: #ff2e7e;
    --f-color-accent-500: #ed2d49;
    --f-color-accent-600: #d1002d;
    --f-color-accent-700: #ac0039;
    --f-color-accent-800: #7e0019;
    --f-color-accent-900: #5c0017;
}
[data-theme='light'] {
    --f-focus: 3px solid #a2cdff;
    --f-color-background: #f7fafc;
    --f-color-accent: #0078ff;
    --f-color-accent-subtle: #7ab8ff80;
    --f-color-accent-strong: #0063d1;
    --f-color-accent-weak: #b9daff;
    --f-color-success: #38b2ac;
    --f-color-success-subtle: #4fd1c580;
    --f-color-success-strong: #2c7a7b;
    --f-color-success-weak: #b2f5ea;
    --f-color-neutral: #a0aec0;
    --f-color-neutral-subtle: #cbd5e080;
    --f-color-neutral-strong: #4a5568;
    --f-color-neutral-weak: #f0f5fa;
    --f-color-caution: #ecc94b;
    --f-color-caution-subtle: #f6e05e80;
    --f-color-caution-strong: #b7791f;
    --f-color-caution-weak: #fefcbf;
    --f-color-warning: #ed8936;
    --f-color-warning-subtle: #f6ad5580;
    --f-color-warning-strong: #c05621;
    --f-color-warning-weak: #feebc8;
    --f-color-danger: #f56565;
    --f-color-danger-subtle: #fc818180;
    --f-color-danger-strong: #c53030;
    --f-color-danger-weak: #fed7d7;
    --f-color-highlight: #9f7aea;
    --f-color-highlight-subtle: #d6bcfa80;
    --f-color-highlight-strong: #6b46c1;
    --f-color-highlight-weak: #e9d8fd;
    --f-color-text: #2d3748;
    --f-color-text-weak: #4a5568;
    --f-color-text-weaker: #718096;
    --f-color-text-weakest: #cbd5e0;
    --f-color-text-link: #0078ff;
    --f-color-text-on-color: #ffffff;
    --f-color-surface: #ffffff;
    --f-color-surface-strong: #f7fafc;
    --f-color-surface-stronger: #f0f5fa;
    --f-color-surface-strongest: #e2e8f0;
    --f-color-surface-highlight: #b9daff;
    --f-color-surface-inverse: #2d3748;
    --f-color-border: #e2e8f0;
    --f-color-border-strong: #cbd5e0;
  }
  [data-theme='dark'] {
    --f-focus: 3px solid #0063d1;
    --f-color-background: #171923;
    --f-color-accent: #2e90ff;
    --f-color-accent-subtle: #0063d180;
    --f-color-accent-strong: #7ab8ff;
    --f-color-accent-weak: #002c5c;
    --f-color-success: #38b2ac;
    --f-color-success-subtle: #2c7a7b80;
    --f-color-success-strong: #4fd1c5;
    --f-color-success-weak: #1d4044;
    --f-color-neutral: #a0aec0;
    --f-color-neutral-subtle: #4a556880;
    --f-color-neutral-strong: #cbd5e0;
    --f-color-neutral-weak: #171923;
    --f-color-caution: #ecc94b;
    --f-color-caution-subtle: #b7791f80;
    --f-color-caution-strong: #f6e05e;
    --f-color-caution-weak: #5f370e;
    --f-color-warning: #ed8936;
    --f-color-warning-subtle: #c0562180;
    --f-color-warning-strong: #f6ad55;
    --f-color-warning-weak: #652b19;
    --f-color-danger: #f56565;
    --f-color-danger-subtle: #c5303080;
    --f-color-danger-strong: #fc8181;
    --f-color-danger-weak: #63171b;
    --f-color-highlight: #9f7aea;
    --f-color-highlight-subtle: #6b46c180;
    --f-color-highlight-strong: #b794f4;
    --f-color-highlight-weak: #322659;
    --f-color-text: #f0f5fa;
    --f-color-text-weak: #cbd5e0;
    --f-color-text-weaker: #a0aec0;
    --f-color-text-weakest: #4a5568;
    --f-color-text-link: #2e90ff;
    --f-color-text-on-color: #000000;
    --f-color-surface: #171923;
    --f-color-surface-strong: #1a202c;
    --f-color-surface-stronger: #2d3748;
    --f-color-surface-strongest: #718096;
    --f-color-surface-highlight: #003c7e;
    --f-color-surface-inverse: #a0aec0;
    --f-color-border: #2d3748;
    --f-color-border-strong: #4a5568;
  }
`,
    red: `
:root {
    --f-color-accent-50: #fff5f5;
    --f-color-accent-100: #fed7d7;
    --f-color-accent-200: #feb2b2;
    --f-color-accent-300: #fc8181;
    --f-color-accent-400: #f56565;
    --f-color-accent-500: #e53e3e;
    --f-color-accent-600: #c53030;
    --f-color-accent-700: #9b2c2c;
    --f-color-accent-800: #822727;
    --f-color-accent-900: #63171b;
}
[data-theme='light'] {
    --f-focus: 3px solid #feb2b2;
    --f-color-background: #f7fafc;
    --f-color-accent: #e53e3e;
    --f-color-accent-weak: #fff5f5;
    --f-color-success: #38b2ac;
    --f-color-success-weak: #b2f5ea;
    --f-color-neutral: #a0aec0;
    --f-color-neutral-weak: #f0f5fa;
    --f-color-caution: #ecc94b;
    --f-color-caution-weak: #fefcbf;
    --f-color-warning: #ed8936;
    --f-color-warning-weak: #feebc8;
    --f-color-danger: #f56565;
    --f-color-danger-weak: #fed7d7;
    --f-color-highlight: #9f7aea;
    --f-color-highlight-weak: #e9d8fd;
    --f-color-text: #2d3748;
    --f-color-text-weak: #4a5568;
    --f-color-text-weaker: #718096;
    --f-color-text-weakest: #cbd5e0;
    --f-color-text-link: #e53e3e;
    --f-color-text-on-color: #ffffff;
    --f-color-surface: #ffffff;
    --f-color-surface-strong: #f7fafc;
    --f-color-surface-stronger: #f0f5fa;
    --f-color-surface-strongest: #e2e8f0;
    --f-color-surface-highlight: #fed7d7;
    --f-color-surface-inverse: #2d3748;
    --f-color-border: #e2e8f0;
    --f-color-border-strong: #cbd5e0;
  }
  [data-theme='dark'] {
    --f-focus: 3px solid #c53030;
    --f-color-background: #171923;
    --f-color-accent: #f56565;
    --f-color-accent-weak: #63171b;
    --f-color-success: #38b2ac;
    --f-color-success-weak: #1d4044;
    --f-color-neutral: #a0aec0;
    --f-color-neutral-weak: #171923;
    --f-color-caution: #ecc94b;
    --f-color-caution-weak: #5f370e;
    --f-color-warning: #ed8936;
    --f-color-warning-weak: #652b19;
    --f-color-danger: #f56565;
    --f-color-danger-weak: #63171b;
    --f-color-highlight: #9f7aea;
    --f-color-highlight-weak: #322659;
    --f-color-text: #f0f5fa;
    --f-color-text-weak: #cbd5e0;
    --f-color-text-weaker: #a0aec0;
    --f-color-text-weakest: #4a5568;
    --f-color-text-link: #f56565;
    --f-color-text-on-color: #000000;
    --f-color-surface: #1a202c;
    --f-color-surface-strong: #2d3748;
    --f-color-surface-stronger: #4a5568;
    --f-color-surface-strongest: #a0aec0;
    --f-color-surface-highlight: #9b2c2c;
    --f-color-surface-inverse: #cbd5e0;
    --f-color-border: #2d3748;
    --f-color-border-strong: #4a5568;
  }
  
`,
    orange: `
:root {
    --f-color-accent-50: #fffaf0;
    --f-color-accent-100: #feebc8;
    --f-color-accent-200: #fbd38d;
    --f-color-accent-300: #f6ad55;
    --f-color-accent-400: #ed8936;
    --f-color-accent-500: #dd6b20;
    --f-color-accent-600: #c05621;
    --f-color-accent-700: #9c4221;
    --f-color-accent-800: #7b341e;
    --f-color-accent-900: #652b19;
}
[data-theme='light'] {
    --f-focus: 3px solid #fbd38d;
    --f-color-background: #f7fafc;
    --f-color-accent: #dd6b20;
    --f-color-accent-weak: #fffaf0;
    --f-color-success: #38b2ac;
    --f-color-success-weak: #b2f5ea;
    --f-color-neutral: #a0aec0;
    --f-color-neutral-weak: #f0f5fa;
    --f-color-caution: #ecc94b;
    --f-color-caution-weak: #fefcbf;
    --f-color-warning: #ed8936;
    --f-color-warning-weak: #feebc8;
    --f-color-danger: #f56565;
    --f-color-danger-weak: #fed7d7;
    --f-color-highlight: #9f7aea;
    --f-color-highlight-weak: #e9d8fd;
    --f-color-text: #2d3748;
    --f-color-text-weak: #4a5568;
    --f-color-text-weaker: #718096;
    --f-color-text-weakest: #cbd5e0;
    --f-color-text-link: #dd6b20;
    --f-color-text-on-color: #ffffff;
    --f-color-surface: #ffffff;
    --f-color-surface-strong: #f7fafc;
    --f-color-surface-stronger: #f0f5fa;
    --f-color-surface-strongest: #e2e8f0;
    --f-color-surface-highlight: #feebc8;
    --f-color-surface-inverse: #2d3748;
    --f-color-border: #e2e8f0;
    --f-color-border-strong: #cbd5e0;
  }
  [data-theme='dark'] {
    --f-focus: 3px solid #c05621;
    --f-color-background: #171923;
    --f-color-accent: #ed8936;
    --f-color-accent-weak: #652b19;
    --f-color-success: #38b2ac;
    --f-color-success-weak: #1d4044;
    --f-color-neutral: #a0aec0;
    --f-color-neutral-weak: #171923;
    --f-color-caution: #ecc94b;
    --f-color-caution-weak: #5f370e;
    --f-color-warning: #ed8936;
    --f-color-warning-weak: #652b19;
    --f-color-danger: #f56565;
    --f-color-danger-weak: #63171b;
    --f-color-highlight: #9f7aea;
    --f-color-highlight-weak: #322659;
    --f-color-text: #f0f5fa;
    --f-color-text-weak: #cbd5e0;
    --f-color-text-weaker: #a0aec0;
    --f-color-text-weakest: #4a5568;
    --f-color-text-link: #ed8936;
    --f-color-text-on-color: #000000;
    --f-color-surface: #1a202c;
    --f-color-surface-strong: #2d3748;
    --f-color-surface-stronger: #4a5568;
    --f-color-surface-strongest: #a0aec0;
    --f-color-surface-highlight: #9c4221;
    --f-color-surface-inverse: #cbd5e0;
    --f-color-border: #2d3748;
    --f-color-border-strong: #4a5568;
  }
`,
    yellow: `
:root {
    --f-color-accent-50: #fffff0;
    --f-color-accent-100: #fefcbf;
    --f-color-accent-200: #faf089;
    --f-color-accent-300: #f6e05e;
    --f-color-accent-400: #ecc94b;
    --f-color-accent-500: #d69e2e;
    --f-color-accent-600: #b7791f;
    --f-color-accent-700: #975a16;
    --f-color-accent-800: #744210;
    --f-color-accent-900: #5f370e;
}

[data-theme='light'] {
  --f-focus: 3px solid #faf089;
  --f-color-background: #f7fafc;
  --f-color-accent: #d69e2e;
  --f-color-accent-weak: #fffff0;
  --f-color-success: #38b2ac;
  --f-color-success-weak: #b2f5ea;
  --f-color-neutral: #a0aec0;
  --f-color-neutral-weak: #f0f5fa;
  --f-color-caution: #ecc94b;
  --f-color-caution-weak: #fefcbf;
  --f-color-warning: #ed8936;
  --f-color-warning-weak: #feebc8;
  --f-color-danger: #f56565;
  --f-color-danger-weak: #fed7d7;
  --f-color-highlight: #9f7aea;
  --f-color-highlight-weak: #e9d8fd;
  --f-color-text: #2d3748;
  --f-color-text-weak: #4a5568;
  --f-color-text-weaker: #718096;
  --f-color-text-weakest: #cbd5e0;
  --f-color-text-link: #d69e2e;
  --f-color-text-on-color: #ffffff;
  --f-color-surface: #ffffff;
  --f-color-surface-strong: #f7fafc;
  --f-color-surface-stronger: #f0f5fa;
  --f-color-surface-strongest: #e2e8f0;
  --f-color-surface-highlight: #fefcbf;
  --f-color-surface-inverse: #2d3748;
  --f-color-border: #e2e8f0;
  --f-color-border-strong: #cbd5e0;
}

[data-theme='dark'] {
  --f-focus: 3px solid #b7791f;
  --f-color-background: #171923;
  --f-color-accent: #ecc94b;
  --f-color-accent-weak: #5f370e;
  --f-color-success: #38b2ac;
  --f-color-success-weak: #1d4044;
  --f-color-neutral: #a0aec0;
  --f-color-neutral-weak: #171923;
  --f-color-caution: #ecc94b;
  --f-color-caution-weak: #5f370e;
  --f-color-warning: #ed8936;
  --f-color-warning-weak: #652b19;
  --f-color-danger: #f56565;
  --f-color-danger-weak: #63171b;
  --f-color-highlight: #9f7aea;
  --f-color-highlight-weak: #322659;
  --f-color-text: #f0f5fa;
  --f-color-text-weak: #cbd5e0;
  --f-color-text-weaker: #a0aec0;
  --f-color-text-weakest: #4a5568;
  --f-color-text-link: #ecc94b;
  --f-color-text-on-color: #000000;
  --f-color-surface: #1a202c;
  --f-color-surface-strong: #2d3748;
  --f-color-surface-stronger: #4a5568;
  --f-color-surface-strongest: #a0aec0;
  --f-color-surface-highlight: #975a16;
  --f-color-surface-inverse: #cbd5e0;
  --f-color-border: #2d3748;
  --f-color-border-strong: #4a5568;
}


`,
    green: `
:root {
    --f-color-accent-50: #f0fff4;
    --f-color-accent-100: #c6f6d5;
    --f-color-accent-200: #9ae6b4;
    --f-color-accent-300: #68d391;
    --f-color-accent-400: #48bb78;
    --f-color-accent-500: #38a169;
    --f-color-accent-600: #2f855a;
    --f-color-accent-700: #276749;
    --f-color-accent-800: #22543d;
    --f-color-accent-900: #1c4532;
}
[data-theme='light'] {
    --f-focus: 3px solid #9ae6b4;
    --f-color-background: #f7fafc;
    --f-color-accent: #38a169;
    --f-color-accent-weak: #f0fff4;
    --f-color-success: #38b2ac;
    --f-color-success-weak: #b2f5ea;
    --f-color-neutral: #a0aec0;
    --f-color-neutral-weak: #f0f5fa;
    --f-color-caution: #ecc94b;
    --f-color-caution-weak: #fefcbf;
    --f-color-warning: #ed8936;
    --f-color-warning-weak: #feebc8;
    --f-color-danger: #f56565;
    --f-color-danger-weak: #fed7d7;
    --f-color-highlight: #9f7aea;
    --f-color-highlight-weak: #e9d8fd;
    --f-color-text: #2d3748;
    --f-color-text-weak: #4a5568;
    --f-color-text-weaker: #718096;
    --f-color-text-weakest: #cbd5e0;
    --f-color-text-link: #38a169;
    --f-color-text-on-color: #ffffff;
    --f-color-surface: #ffffff;
    --f-color-surface-strong: #f7fafc;
    --f-color-surface-stronger: #f0f5fa;
    --f-color-surface-strongest: #e2e8f0;
    --f-color-surface-highlight: #c6f6d5;
    --f-color-surface-inverse: #2d3748;
    --f-color-border: #e2e8f0;
    --f-color-border-strong: #cbd5e0;
  }
  [data-theme='dark'] {
    --f-focus: 3px solid #2f855a;
    --f-color-background: #171923;
    --f-color-accent: #48bb78;
    --f-color-accent-weak: #1c4532;
    --f-color-success: #38b2ac;
    --f-color-success-weak: #1d4044;
    --f-color-neutral: #a0aec0;
    --f-color-neutral-weak: #171923;
    --f-color-caution: #ecc94b;
    --f-color-caution-weak: #5f370e;
    --f-color-warning: #ed8936;
    --f-color-warning-weak: #652b19;
    --f-color-danger: #f56565;
    --f-color-danger-weak: #63171b;
    --f-color-highlight: #9f7aea;
    --f-color-highlight-weak: #322659;
    --f-color-text: #f0f5fa;
    --f-color-text-weak: #cbd5e0;
    --f-color-text-weaker: #a0aec0;
    --f-color-text-weakest: #4a5568;
    --f-color-text-link: #48bb78;
    --f-color-text-on-color: #000000;
    --f-color-surface: #1a202c;
    --f-color-surface-strong: #2d3748;
    --f-color-surface-stronger: #4a5568;
    --f-color-surface-strongest: #a0aec0;
    --f-color-surface-highlight: #276749;
    --f-color-surface-inverse: #cbd5e0;
    --f-color-border: #2d3748;
    --f-color-border-strong: #4a5568;
  }
`,
    teal: `
:root {
    --f-color-accent-50: #e6fffa;
    --f-color-accent-100: #b2f5ea;
    --f-color-accent-200: #81e6d9;
    --f-color-accent-300: #4fd1c5;
    --f-color-accent-400: #38b2ac;
    --f-color-accent-500: #319795;
    --f-color-accent-600: #2c7a7b;
    --f-color-accent-700: #285e61;
    --f-color-accent-800: #234e52;
    --f-color-accent-900: #1d4044;
}
[data-theme='light'] {
    --f-focus: 3px solid #81e6d9;
    --f-color-background: #f7fafc;
    --f-color-accent: #319795;
    --f-color-accent-weak: #e6fffa;
    --f-color-success: #38b2ac;
    --f-color-success-weak: #b2f5ea;
    --f-color-neutral: #a0aec0;
    --f-color-neutral-weak: #f0f5fa;
    --f-color-caution: #ecc94b;
    --f-color-caution-weak: #fefcbf;
    --f-color-warning: #ed8936;
    --f-color-warning-weak: #feebc8;
    --f-color-danger: #f56565;
    --f-color-danger-weak: #fed7d7;
    --f-color-highlight: #9f7aea;
    --f-color-highlight-weak: #e9d8fd;
    --f-color-text: #2d3748;
    --f-color-text-weak: #4a5568;
    --f-color-text-weaker: #718096;
    --f-color-text-weakest: #cbd5e0;
    --f-color-text-link: #319795;
    --f-color-text-on-color: #ffffff;
    --f-color-surface: #ffffff;
    --f-color-surface-strong: #f7fafc;
    --f-color-surface-stronger: #f0f5fa;
    --f-color-surface-strongest: #e2e8f0;
    --f-color-surface-highlight: #b2f5ea;
    --f-color-surface-inverse: #2d3748;
    --f-color-border: #e2e8f0;
    --f-color-border-strong: #cbd5e0;
  }
  [data-theme='dark'] {
    --f-focus: 3px solid #2c7a7b;
    --f-color-background: #171923;
    --f-color-accent: #38b2ac;
    --f-color-accent-weak: #1d4044;
    --f-color-success: #38b2ac;
    --f-color-success-weak: #1d4044;
    --f-color-neutral: #a0aec0;
    --f-color-neutral-weak: #171923;
    --f-color-caution: #ecc94b;
    --f-color-caution-weak: #5f370e;
    --f-color-warning: #ed8936;
    --f-color-warning-weak: #652b19;
    --f-color-danger: #f56565;
    --f-color-danger-weak: #63171b;
    --f-color-highlight: #9f7aea;
    --f-color-highlight-weak: #322659;
    --f-color-text: #f0f5fa;
    --f-color-text-weak: #cbd5e0;
    --f-color-text-weaker: #a0aec0;
    --f-color-text-weakest: #4a5568;
    --f-color-text-link: #38b2ac;
    --f-color-text-on-color: #000000;
    --f-color-surface: #1a202c;
    --f-color-surface-strong: #2d3748;
    --f-color-surface-stronger: #4a5568;
    --f-color-surface-strongest: #a0aec0;
    --f-color-surface-highlight: #285e61;
    --f-color-surface-inverse: #cbd5e0;
    --f-color-border: #2d3748;
    --f-color-border-strong: #4a5568;
  }
`,
    cyan: `
:root {
    --f-color-accent-50: #edfdfd;
    --f-color-accent-100: #c4f1f9;
    --f-color-accent-200: #9decf9;
    --f-color-accent-300: #76e4f7;
    --f-color-accent-400: #0bc5ea;
    --f-color-accent-500: #00b5d8;
    --f-color-accent-600: #00a3c4;
    --f-color-accent-700: #0987a0;
    --f-color-accent-800: #086f83;
    --f-color-accent-900: #065666;
}
[data-theme='light'] {
    --f-focus: 3px solid #9decf9;
    --f-color-background: #f7fafc;
    --f-color-accent: #00b5d8;
    --f-color-accent-weak: #edfdfd;
    --f-color-success: #38b2ac;
    --f-color-success-weak: #b2f5ea;
    --f-color-neutral: #a0aec0;
    --f-color-neutral-weak: #f0f5fa;
    --f-color-caution: #ecc94b;
    --f-color-caution-weak: #fefcbf;
    --f-color-warning: #ed8936;
    --f-color-warning-weak: #feebc8;
    --f-color-danger: #f56565;
    --f-color-danger-weak: #fed7d7;
    --f-color-highlight: #9f7aea;
    --f-color-highlight-weak: #e9d8fd;
    --f-color-text: #2d3748;
    --f-color-text-weak: #4a5568;
    --f-color-text-weaker: #718096;
    --f-color-text-weakest: #cbd5e0;
    --f-color-text-link: #00b5d8;
    --f-color-text-on-color: #ffffff;
    --f-color-surface: #ffffff;
    --f-color-surface-strong: #f7fafc;
    --f-color-surface-stronger: #f0f5fa;
    --f-color-surface-strongest: #e2e8f0;
    --f-color-surface-highlight: #c4f1f9;
    --f-color-surface-inverse: #2d3748;
    --f-color-border: #e2e8f0;
    --f-color-border-strong: #cbd5e0;
  }
  [data-theme='dark'] {
    --f-focus: 3px solid #00a3c4;
    --f-color-background: #171923;
    --f-color-accent: #0bc5ea;
    --f-color-accent-weak: #065666;
    --f-color-success: #38b2ac;
    --f-color-success-weak: #1d4044;
    --f-color-neutral: #a0aec0;
    --f-color-neutral-weak: #171923;
    --f-color-caution: #ecc94b;
    --f-color-caution-weak: #5f370e;
    --f-color-warning: #ed8936;
    --f-color-warning-weak: #652b19;
    --f-color-danger: #f56565;
    --f-color-danger-weak: #63171b;
    --f-color-highlight: #9f7aea;
    --f-color-highlight-weak: #322659;
    --f-color-text: #f0f5fa;
    --f-color-text-weak: #cbd5e0;
    --f-color-text-weaker: #a0aec0;
    --f-color-text-weakest: #4a5568;
    --f-color-text-link: #0bc5ea;
    --f-color-text-on-color: #000000;
    --f-color-surface: #1a202c;
    --f-color-surface-strong: #2d3748;
    --f-color-surface-stronger: #4a5568;
    --f-color-surface-strongest: #a0aec0;
    --f-color-surface-highlight: #0987a0;
    --f-color-surface-inverse: #cbd5e0;
    --f-color-border: #2d3748;
    --f-color-border-strong: #4a5568;
  }
`,
    electric: `
:root {
    --f-color-accent-50: #d0e6ff;
    --f-color-accent-100: #b9daff;
    --f-color-accent-200: #a2cdff;
    --f-color-accent-300: #7ab8ff;
    --f-color-accent-400: #2e90ff;
    --f-color-accent-500: #0078ff;
    --f-color-accent-600: #0063d1;
    --f-color-accent-700: #0052ac;
    --f-color-accent-800: #003c7e;
    --f-color-accent-900: #002c5c;
}

[data-theme='light'] {
    --f-focus: 3px solid #a2cdff;
    --f-color-background: #f7fafc;
    --f-color-accent: #0078ff;
    --f-color-accent-weak: #d0e6ff;
    --f-color-success: #38b2ac;
    --f-color-success-weak: #b2f5ea;
    --f-color-neutral: #a0aec0;
    --f-color-neutral-weak: #f0f5fa;
    --f-color-caution: #ecc94b;
    --f-color-caution-weak: #fefcbf;
    --f-color-warning: #ed8936;
    --f-color-warning-weak: #feebc8;
    --f-color-danger: #f56565;
    --f-color-danger-weak: #fed7d7;
    --f-color-highlight: #9f7aea;
    --f-color-highlight-weak: #e9d8fd;
    --f-color-text: #2d3748;
    --f-color-text-weak: #4a5568;
    --f-color-text-weaker: #718096;
    --f-color-text-weakest: #cbd5e0;
    --f-color-text-link: #0078ff;
    --f-color-text-on-color: #ffffff;
    --f-color-surface: #ffffff;
    --f-color-surface-strong: #f7fafc;
    --f-color-surface-stronger: #f0f5fa;
    --f-color-surface-strongest: #e2e8f0;
    --f-color-surface-highlight: #b9daff;
    --f-color-surface-inverse: #2d3748;
    --f-color-border: #e2e8f0;
    --f-color-border-strong: #cbd5e0;
  }

  [data-theme='dark'] {
  --f-focus: 3px solid #0063d1;
  --f-color-background: #171923;
  --f-color-accent: #2e90ff;
  --f-color-accent-weak: #002c5c;
  --f-color-success: #38b2ac;
  --f-color-success-weak: #1d4044;
  --f-color-neutral: #a0aec0;
  --f-color-neutral-weak: #171923;
  --f-color-caution: #ecc94b;
  --f-color-caution-weak: #5f370e;
  --f-color-warning: #ed8936;
  --f-color-warning-weak: #652b19;
  --f-color-danger: #f56565;
  --f-color-danger-weak: #63171b;
  --f-color-highlight: #9f7aea;
  --f-color-highlight-weak: #322659;
  --f-color-text: #f0f5fa;
  --f-color-text-weak: #cbd5e0;
  --f-color-text-weaker: #a0aec0;
  --f-color-text-weakest: #4a5568;
  --f-color-text-link: #2e90ff;
  --f-color-text-on-color: #000000;
  --f-color-surface: #1a202c;
  --f-color-surface-strong: #2d3748;
  --f-color-surface-stronger: #4a5568;
  --f-color-surface-strongest: #a0aec0;
  --f-color-surface-highlight: #0052ac;
  --f-color-surface-inverse: #cbd5e0;
  --f-color-border: #2d3748;
  --f-color-border-strong: #4a5568;
}

`,
}

const sparkline = [
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
]

export const Code = ({ snippet }) => {
    const { copyToClipboard } = useCopy()

    return (
        <View
            width={500}
            className="code"
            position="relative">
            <Button
                onClick={() => copyToClipboard(snippet)}
                zIndex={10}
                size="xs"
                style={{
                    'position': 'absolute',
                    'top': '50%',
                    'right': 10,
                    'transform': 'translateY(-50%)',
                    '--f-button-active-background': 'var(--f-color-base-600)',
                    '--f-button-border-color': 'var(--f-color-base-600)',
                    '--f-button-background-color': 'var(--f-color-base-800)',
                    '--f-button-background-color-hover': 'var(--f-color-base-600)',
                    '--f-button-color': 'var(--f-color-base-100)',
                    '--f-button-color-hover': 'var(--f-color-base-200)',
                }}>
                <IconLib
                    icon="copy"
                    size="sm"
                />
            </Button>
            <style>
                {`
                    [data-rehype-pretty-code-figure] pre { 
                        border-radius: var(--f-radius) !important;
                        border: 1px solid var(--f-color-base-700);
                    }
                `}
            </style>
            <CodeComponent
                lang="bash"
                showSnippet
                showCopy={false}
                filename="main.tsx"
                code={btoa(`
    ${snippet}`)}
            />
        </View>
    )
}

export const Picker = () => {
    const [color, setColor] = useState(Token.ColorCyan400)

    return (
        <ColorPicker
            border="0.1rem solid var(--f-color-border)"
            radius="var(--f-radius)"
            bgToken="surface"
            p={20}
            color={color}
            onChange={setColor}
        />
    )
}

const All = () => {
    const [selected, setSelected] = useState<any>([])
    const [color, setColor] = useState(Token.ColorBlue400)
    const [value, setValue] = useState(3)
    const [option, setOption] = useState(2)

    const setAccent = (color) => {
        document.getElementById('custom-styles').innerHTML = colors[color]
    }

    const setFont = (family) => {
        const d: any = document.querySelector(':root')
        d.style.setProperty('--f-font-heading', family)
        d.style.setProperty('--f-font-body', family)

        documentObject.body.style.cssText = `--f-font-heading: ${family}`
        documentObject.body.style.cssText = `--f-font-body: ${family}`

        document.getElementById('custom-styles').innerHTML = `
            :root {
                --f-font-heading: ${family};
                --f-font-body: ${family};
            }
        `
    }

    useEffect(() => {
        switch (option) {
            case 0:
                return setFont(
                    'ui-sans-serif,-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif !important'
                )
            case 1:
                return setFont(
                    'Inter,-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif !important'
                )
            case 2:
                return setFont(
                    'Instrument Sans,-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif !important'
                )
        }
    }, [option])

    useEffect(() => {
        return
        switch (color) {
            case Token.ColorPurple400:
                return setAccent('purple')
            case Token.ColorPink400:
                return setAccent('neonpink')
            case Token.ColorRed400:
                return setAccent('red')
            case Token.ColorOrange400:
                return setAccent('orange')
            case Token.ColorYellow400:
                return setAccent('yellow')
            case Token.ColorGreen400:
                return setAccent('green')
            case Token.ColorTeal400:
                return setAccent('teal')
            case Token.ColorCyan400:
                return setAccent('cyan')
            case Token.ColorBlue400:
                return setAccent('electric')
        }
    }, [color])

    useEffect(() => {
        const of = 3
        const percent = value / 10
        const radius = of * percent + 'rem'
        const d: any = document.querySelector(':root')

        d.style.setProperty('--f-radius', radius)
    }, [value])

    return (
        <View 
            border="1px solid var(--f-color-border)"
            radius="var(--f-radius)"
            width="85%"
            m="0 auto 0rem auto"
            style={{ overflow: 'hidden' }}
            bg="linear-gradient(to bottom right, var(--f-color-surface), transparent)"
            className="core__components-container">
            <View
                column
                height="100%"
                className="dotted"
                gap="2rem"
                alignItems="flex-start"
                alignContent="flex-start"
                justifyContent="flex-start"
                p="3rem"
                position="relative">
                <View
                    row
                    gap="2rem"
                    height="fit-content"
                    alignItems="flex-start"
                    className="core__components">
                    <View
                        column
                        gap="1rem"
                        flex={1}>
                        <Menu
                            width="100%"
                            zIndex="0"
                            shadow="none">
                            <MenuOptionGroup
                                title="State Management"
                                defaultValue="redux"
                                type="radio">
                                <MenuItemOption value="redux">Redux</MenuItemOption>
                                <MenuItemOption value="mobx">MobX</MenuItemOption>
                                <MenuItemOption value="zustand">Zustand</MenuItemOption>
                            </MenuOptionGroup>
                        </Menu>

                        <Card
                            p={20}
                            width="100%">
                            <Heading
                                as="h5"
                                fontWeight="bold"
                                m="0 0 1rem 0">
                                Activity
                            </Heading>
                            <Timeline>
                                <TimelineItem
                                    marker={
                                        <Avatar
                                            size="xs"
                                            src="https://randomuser.me/api/portraits/men/12.jpg"
                                        />
                                    }>
                                    <Text>Rob opened the attachment in Microsoft Outlook</Text>
                                </TimelineItem>
                                <TimelineItem colorToken="text">
                                    <Text>Image attachment downloaded from the server</Text>
                                </TimelineItem>
                                <TimelineItem colorToken="text">
                                    <Text>Message flagged as harmless by anti-virus system</Text>
                                </TimelineItem>
                            </Timeline>
                        </Card>
                    </View>



                    <View
                        column
                        gap="1rem"
                        width={250}>
                        <Dropdown />
                        <Picker />
                    </View>



                    <View
                        column
                        gap="1rem"
                        width={310}>
                        <Options
                            animated
                            shadow="none"
                            width="100%"
                            selected={option}
                            onOptionChange={setOption}>
                            <Option>System</Option>
                            <Option>Inter</Option>
                            <Option>Instrument</Option>
                        </Options>

                        <Card
                            p="0rem 1rem"
                            width="100%"
                            row>
                            <View>
                                <Tabs
                                    selected={selected}
                                    onSelect={setSelected}
                                    animated>
                                    <TabList
                                        height={60}
                                        border="none"
                                        stretch
                                        disableScroll>
                                        <Tab>Members</Tab>
                                        <Tab>Security</Tab>
                                        <Tab>Account</Tab>
                                    </TabList>
                                </Tabs>
                            </View>
                        </Card>
{/* 
                        <Card
                            width="100%"
                            p="0.5rem 0.5rem">
                            <Palette
                                justifyContent="center"
                                gap={8}
                                color={color}
                                colors={[
                                    Token.ColorPurple400,
                                    Token.ColorPink400,
                                    Token.ColorRed400,
                                    Token.ColorOrange400,
                                    Token.ColorYellow400,
                                    Token.ColorGreen400,
                                    Token.ColorTeal400,
                                    Token.ColorCyan400,
                                    Token.ColorBlue400,
                                ]}
                                onChange={setColor}
                            />
                        </Card>
 */}
                        <Attachment
                            width="100%"
                            mime="image/png"
                            filesize={24325}
                            label="screenshot.png"
                            href="https://fold.dev"
                        />

                        <Copy
                            value="049d2ee4-6672-11ee-8c99-0242ac120002"
                            prefix={<IconLib icon="circle" />}
                            suffix={
                                <Pill
                                    size="xs"
                                    m="0 1rem">
                                    UUID
                                </Pill>
                            }
                        />

                        <View
                            row
                            gap={5}
                            width="100%">
                            <Pill
                                size="sm"
                                color={Token.ColorPink500}>
                                React
                            </Pill>
                            <Pill
                                solid
                                size="sm"
                                color={Token.ColorPurple100}>
                                UI
                            </Pill>
                            <Pill
                                solid
                                size="sm"
                                color={Token.ColorBlue300}>
                                Components
                            </Pill>
                            <Pill
                                solid
                                size="sm"
                                color={Token.ColorTeal100}>
                                TypeScript
                            </Pill>
                        </View>

                        <Card
                            width="100%"
                            p={20}>
                            <Range
                                min={0}
                                max={10}
                                step={1}
                                value={value}
                                onChange={(e: any) => setValue(e.target.value)}
                            />
                        </Card>
                    </View>

                    <View
                        column
                        gap="1rem"
                        width={320}
                        alignItems="flex-end">
                        <Card
                            p={10}
                            width={320}>
                            <ScrollingPicker />
                        </Card>

                        <Card
                            p="0.75rem 1rem"
                            width="100%">
                            <Sparkline
                                style={{ 
                                    maskImage: 'linear-gradient(to bottom, var(--f-color-surface) 10%, transparent)',
                                }}
                                data={sparkline}
                                variant="line"
                                width="100%"
                                height={30}
                            />
                        </Card>
                        <Card
                            display="none"
                            width="100%"
                            footer={
                                <>
                                    <Divider />
                                    <ButtonGroup
                                        p={15}
                                        justifyContent="stretch"
                                        width="100%">
                                        <Button>Visit</Button>
                                        <Button>Wishlist</Button>
                                    </ButtonGroup>
                                </>
                            }
                            header={
                                <Image
                                    width="100%"
                                    height={125}
                                    src="building.png"
                                />
                            }>
                            <View p={20}>
                                <Stack
                                    direction="vertical"
                                    spacing={10}>
                                    <View
                                        row
                                        gap={5}
                                        justifyContent="flex-start">
                                        <Pill
                                            color={Token.ColorBlue400}
                                            subtle
                                            size="sm">
                                            co-working
                                        </Pill>
                                        <Pill
                                            color={Token.ColorAccent400}
                                            subtle
                                            size="sm">
                                            remote
                                        </Pill>
                                    </View>
                                    <Heading as="h2">Perfect Getaway</Heading>
                                    <Text>
                                        A once in a lifetime opportunity to live and work remotely in a
                                        breathtaking location!
                                    </Text>
                                    <Text
                                        size="sm"
                                        colorToken="accent">
                                        Terms & conditions apply
                                    </Text>
                                </Stack>
                            </View>
                        </Card>

                        <View
                            row
                            justifyContent="flex-end"
                            gap={10}>
                            <Text
                                as="label"
                                htmlFor="dm">
                                Toggle Dark Mode
                            </Text>
                            <DarkModeToggle id="dm" />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export const Dropdown = () => {
    const [selected, setSelected] = useState<any>([timezones[0], timezones[4], timezones[8]])

    const handleSelect = (option, dismiss) => {
        if (selected.includes(option.key)) {
            setSelected([...selected.filter((optionKey) => option.key != optionKey)])
        } else {
            setSelected([...selected, option.key])
        }
    }

    return (
        <Select
            width={250}
            prefix={<IconLib icon="time" />}
            suffix={<IconLib icon="chevron-down" />}
            placeholder="Select a timezone"
            selected={selected}
            onSelect={handleSelect}
            options={timezones.map((tz) => ({
                key: tz,
                label: tz,
            }))}
        />
    )
}

const snippet1 = `
\`\`\`
    <View 
        row 
        gap="0.5rem"
        wrap="wrap"
        justifyContent="flex-start">
        <Pill>TypeScript</Pill>
        <Pill>Prettier</Pill>
        <Pill>Design Tokens</Pill>
        <Pill>StyleDictionary</Pill>
        <Pill>Storybook</Pill>
        <Pill>React</Pill>
        <Pill>CSS3</Pill>
        <Pill>TypeDoc</Pill>
        <Pill>TypeScript</Pill>
        <Pill>Prettier</Pill>
        <Pill>Design Tokens</Pill>
        <Pill>StyleDictionary</Pill>
        <Pill>Storybook</Pill>
        <Pill>Hooks</Pill>
        <Pill>CSS3</Pill>
    </View>
\`\`\`
`

export const CoreComponent = () => {
    const [html, setHtml] = useState('')

    useEffect(() => {
        highlightCode(snippet1, 'javascript').then((html) => setHtml(html))
    }, [])

    return (
        <>
            <View
                id="core"
                column
                gap={70}
                flex={1}
                width="100%"
                justifyContent="flex-start"
                alignContent="flex-start"
                alignItems="flex-start"
                m="-500px 0 0 0"
                p="600px 0 100px 0">
                <View
                    column
                    flex={1}
                    gap="2rem"
                    width="85%"
                    m="0 auto"
                    height="fit-content"
                    justifyContent="flex-start"
                    alignContent="flex-start"
                    position="relative"
                    p="0 0rem 0 4rem"
                    className="core__hero">
                    <Text
                        textAlign="center"
                        style={{ textTransform: 'uppercase' }}
                        letterSpacing={5}
                        colorToken="text-weakest">
                        Open Source
                    </Text>
                    <Heading
                        textAlign="center"
                        colorToken="text-weak"
                        fontWeight={400}
                        width="80%">
                        Leverage Fold's 85+ components to power your next project. 
                        Fold is completely free (MIT), and will always remain that way.
                    </Heading>
                    <Code snippet="npm i --save @fold-dev/core @fold-dev/design" />
                    {/* 
                    <View
                        row
                        gap={20}
                        m="0 0 5rem 0"
                        colorToken="accent-200">
                        <Button
                            outline
                            variant="accent">
                            Read Documentation ↗
                        </Button>
                        <Link
                            target="_blank"
                            href="/docs"
                            className="f-underline"
                            textDecoration="none">
                            GitHub ↗
                        </Link>
                    </View>
                    */}
                </View>
            </View>

            <All />

            {/* features */}
{/* 
            <View
                display="none"
                row
                width="100%">
                <View
                    row
                    gap="2rem"
                    width="85%"
                    radius="var(--f-radius)"
                    bgToken="accent"
                    border="1px solid var(--f-color-border)"
                    position="relative"
                    style={{ overflow: 'hidden' }}
                    alignItems="flex-start"
                    className="overview-calendar">
                    <GraphicLeft
                        color={Token.ColorAccent200}
                        style={{ position: 'absolute', bottom: -100, left: -200, opacity: 0.1 }}
                        width={1107 / 2}
                        height={559 / 2}
                    />

                    <View
                        column
                        flex={1}
                        gap={30}
                        alignItems="flex-start"
                        p="5rem 0rem 5rem 5rem">
                        <Text
                            style={{ textTransform: 'uppercase' }}
                            letterSpacing={5}
                            colorToken="accent-300"
                            id="features">
                            Case Study
                        </Text>
                        <Heading
                            colorToken="accent-50"
                            fontWeight={400}>
                            Made for product teams that need to scale quickly.
                        </Heading>
                        <Text colorToken="accent-200">
                            Fronteer leverages Fold's design system and core component library to accelerate development and enhance the overall quality of their product DX.
                        </Text>
                        <Link
                            target="_blank"
                            href="https://fronteer.app"
                            color="var(--f-color-accent-50)"
                            className="f-underline"
                            textDecoration="none">
                            fronteer.app ↗
                        </Link>
                    </View>

                    <View
                        flex={2}
                        height={500}
                        position="relative">
                        <View 
                            height={1250}
                            width={1250}
                            style={{ left: 0, top: -35, transform: 'rotateZ(8deg)' }}
                            position="absolute">
                            <img
                                className="lazy-load-dark"
                                style={{ 
                                    visibility: 'hidden', 
                                    position: 'absolute', 
                                    zIndex: -1, 
                                    top: 0, 
                                    left: 0,
                                    width: 0,
                                    height: 0,
                                }}
                            />
                            <img
                                className="lazy-load-light"
                                style={{ 
                                    visibility: 'hidden', 
                                    position: 'absolute', 
                                    zIndex: -1, 
                                    top: 0, 
                                    left: 0,
                                    width: 0,
                                    height: 0,
                                }}
                            />
                            <img 
                                style={{ position: 'relative', zIndex: 0 }}
                                src="screenshot.png" 
                                height="100%"
                                width="auto"
                                className="pro-image"
                            />
                        </View>
                    </View>
                </View>
            </View>
 */}

            <View
                row
                gap="3rem"
                width="85%"
                m="3rem auto 3rem auto"
                radius="var(--f-radius)"
                position="relative"
                className="features"
                style={{ overflow: 'hidden' }}
                alignItems="stretch">
                <View 
                    border="1px solid var(--f-color-border)"
                    radius="var(--f-radius)"
                    flex={2}
                    position="relative"
                    style={{ overflow: 'hidden' }}
                    bg="linear-gradient(to bottom right, var(--f-color-surface), transparent)">
                    <View
                        column
                        gap="2rem"
                        className="dotted"
                        alignItems="flex-start"
                        alignContent="flex-start"
                        justifyContent="flex-start"
                        p="3rem">
                        <Text
                            style={{ textTransform: 'uppercase' }}
                            letterSpacing={5}
                            colorToken="text-weakest"
                            id="features">
                            Lightweight
                        </Text>
                        <Heading
                            colorToken="text"
                            fontWeight={400}>
                            Zero Dependencies
                        </Heading>
                        <Text
                            size="lg"
                            colorToken="text-weak"
                            fontWeight={400}
                            width="70%">
                            Stop spending time groking build sizes and resolving dependency conflicts. Fold has no other dependencies, other than React and ReactDOM.
                        </Text>
                        <Link
                            href="/docs/faq"
                            target="_blank"
                            color="var(--f-color-text)"
                            className="f-underline"
                            textDecoration="none">
                            Read More ↗
                        </Link>
                        <View 
                            height="fit-content"
                            width="fit-content"
                            style={{ bottom: -130, right: -90, overflow: 'hidden' }}
                            position="absolute">
                            <img 
                                src="lines.svg" 
                                width="413" 
                                height="434" 
                                className="lines"
                            />
                        </View>
                    </View>
                </View>

                <View 
                    border="1px solid var(--f-color-border)"
                    radius="var(--f-radius)"
                    flex={1}
                    style={{ overflow: 'hidden' }}
                    bg="linear-gradient(to bottom right, var(--f-color-surface), transparent)">
                    <View
                        column
                        gap="2rem"
                        className="dotted"
                        position="relative"
                        alignItems="flex-start"
                        alignContent="flex-start"
                        justifyContent="flex-start"
                        p="3rem"
                        height="100%">
                        <Text
                            style={{ textTransform: 'uppercase' }}
                            letterSpacing={5}
                            colorToken="text-weakest"
                            id="features">
                            Themable
                        </Text>
                        <Heading
                            colorToken="text"
                            fontWeight={400}>
                            Dark Mode
                        </Heading>
                        <Text
                            size="lg"
                            colorToken="text-weak"
                            fontWeight={400}>
                            Fold supports Dark Mode out of the box, and includes all of the tools necessary for you to roll your own theme.
                        </Text>
                    </View>
                    <View 
                        height="fit-content"
                        width="fit-content"
                        style={{ bottom: 20, right: 20 }}
                        position="absolute">
                        <DarkModeButton />
                    </View>
                </View>
            </View>

            <View
                row
                gap="3rem"
                width="85%"
                m="3rem auto 6rem auto"
                radius="var(--f-radius)"
                position="relative"
                className="features"
                style={{ overflow: 'hidden' }}
                alignItems="stretch">
                <View 
                    border="1px solid var(--f-color-border)"
                    radius="var(--f-radius)"
                    flex={1}
                    style={{ overflow: 'hidden' }}
                    bg="linear-gradient(to bottom right, var(--f-color-surface), transparent)">
                    <View
                        column
                        gap="2rem"
                        position="relative"
                        className="dotted"
                        alignItems="flex-start"
                        alignContent="flex-start"
                        justifyContent="flex-start"
                        p="3rem">
                        <Text
                            style={{ textTransform: 'uppercase' }}
                            letterSpacing={5}
                            colorToken="text-weakest"
                            id="features">
                            Design System
                        </Text>
                        <Heading
                            colorToken="text"
                            fontWeight={400}>
                            Learn about the principals that underpin Fold's Design System.
                        </Heading>
                        <Text
                            size="lg"
                            colorToken="text-weak"
                            fontWeight={400}>
                            Let Fold do the heavy lifting. Fold ships with its own design system based on sensible defaults.
                        </Text>
                        <Link
                            href="/docs/design-system"
                            target="_blank"
                            color="var(--f-color-text)"
                            className="f-underline"
                            textDecoration="none">
                            Read More ↗
                        </Link>
                        <View 
                            height="fit-content"
                            width="fit-content"
                            style={{ bottom: 20, right: 20, overflow: 'hidden' }}
                            position="absolute">
                            <Icon 
                                style={{ '--f-icon-sizing-xl': '4rem', '--f-icon-stroke-width-xl': '0.1' }}
                                icon={PiCompassTool}
                                size="xl"
                                color="var(--f-color-text-weakest)"
                            />
                        </View>
                    </View>
                </View>

                <View 
                    border="1px solid var(--f-color-border)"
                    radius="var(--f-radius)"
                    flex={2}
                    style={{ overflow: 'hidden' }}
                    bg="linear-gradient(to bottom right, var(--f-color-surface), transparent)">
                    <View
                        column
                        height="100%"
                        className="dotted dx"
                        gap="2rem"
                        alignItems="flex-start"
                        alignContent="flex-start"
                        justifyContent="flex-start"
                        p="3rem"
                        position="relative">
                        <Text
                            style={{ textTransform: 'uppercase' }}
                            letterSpacing={5}
                            colorToken="text-weakest"
                            id="features">
                            Developer Friendly
                        </Text>
                        <Heading
                            colorToken="text"
                            fontWeight={400}>
                            Great DX
                        </Heading>
                        <Text
                            size="lg"
                            colorToken="text-weak"
                            fontWeight={400}>
                            Powered by TypeScript, Fold lets you discover the perfect balance of component composability, CSS3 magic, and intuitive prop design - working together to deliver an enjoyable developer experience.
                        </Text>
                        <View 
                            row 
                            gap="0.5rem"
                            wrap="wrap"
                            justifyContent="flex-start">
                            <Pill subtle color={Token.ColorAccent400}>TypeScript</Pill>
                            <Pill subtle color={Token.ColorPurple400}>React</Pill>
                            <Pill subtle color={Token.ColorPink400}>Design Tokens</Pill>
                            <Pill subtle color={Token.ColorRed400}>StyleDictionary</Pill>
                            <Pill subtle color={Token.ColorOrange400}>Storybook</Pill>
                            <Pill subtle color={Token.ColorYellow400}>CSS3</Pill>
                            <Pill subtle color={Token.ColorTeal400}>TypeDoc</Pill>
                        </View>
                        <Link
                            href="/docs"
                            target="_blank"
                            color="var(--f-color-text)"
                            className="f-underline"
                            textDecoration="none">
                            Read More ↗
                        </Link>
                        <View 
                            height="fit-content"
                            width="50%"
                            style={{ top: 0, right: 0, overflow: 'hidden' }}
                            position="absolute"
                            className="dx-code">
                            <section
                                style={{ width: '100%',  height: '100%', overflow: 'hidden' }}
                                dangerouslySetInnerHTML={{ __html: html }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}
