import * as rp from 'react-resizable-panels';
console.log('ESM Exports keys:', Object.keys(rp));
// Also try named imports
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
console.log('PanelGroup:', typeof PanelGroup);
console.log('Panel:', typeof Panel);
console.log('PanelResizeHandle:', typeof PanelResizeHandle);
