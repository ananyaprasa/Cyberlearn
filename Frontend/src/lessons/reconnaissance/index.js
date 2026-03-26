import { NetworkScanningFundamentals } from './NetworkScanningFundamentals';
import { PassiveReconnaissance } from './PassiveReconnaissance';
import { PortScanningWithNmap } from './PortScanningWithNmap';
import { ActiveReconnaissance } from './ActiveReconnaissance';
import { ServiceVersionDetection } from './ServiceVersionDetection';

export { NetworkScanningFundamentals, PassiveReconnaissance, PortScanningWithNmap, ActiveReconnaissance, ServiceVersionDetection };

export const reconnaissanceLessons = [
  NetworkScanningFundamentals,
  PassiveReconnaissance,
  PortScanningWithNmap,
  ActiveReconnaissance,
  ServiceVersionDetection
];