import { 
  MessageSquare, 
  Terminal, 
  Box, 
  Globe, 
  Monitor, 
  Activity, 
  Layout, 
  HardDrive 
} from 'lucide-react';

export const MOCK_APPS = [
  {
    id: 'sw1',
    name: 'Slack',
    category: 'Communication',
    icon: MessageSquare,
    color: 'text-blue-400'
  },
  {
    id: 'sw2',
    name: 'VS Code',
    category: 'Development',
    icon: Terminal,
    color: 'text-sky-400'
  },
  {
    id: 'sw3',
    name: 'Docker',
    category: 'Infrastructure',
    icon: Box,
    color: 'text-blue-500'
  },
  {
    id: 'sw4',
    name: 'Chrome',
    category: 'Browser',
    icon: Globe,
    color: 'text-red-400'
  },
  {
    id: 'sw5',
    name: 'Zoom',
    category: 'Communication',
    icon: Monitor,
    color: 'text-orange-400'
  },
  {
    id: 'sw6',
    name: 'Postman',
    category: 'API Testing',
    icon: Activity,
    color: 'text-orange-500'
  },
  {
    id: 'sw7',
    name: 'Figma',
    category: 'Design',
    icon: Layout,
    color: 'text-purple-400'
  },
  {
    id: 'sw8',
    name: 'GitHub',
    category: 'Version Control',
    icon: HardDrive,
    color: 'text-white'
  }
];

export const transition = {
  type: 'spring',
  stiffness: 40,
  damping: 20,
  mass: 1.2
};
