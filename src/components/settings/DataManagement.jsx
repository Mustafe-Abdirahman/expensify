import ExportDataCard from './ExportDataCard';
import ImportDataCard from './ImportDataCard';
import BackupSettings from './BackupSettings';

export default function DataManagement() {
  return (
    <div className="space-y-4">
      <ExportDataCard />
      <ImportDataCard />
      <BackupSettings />
    </div>
  );
}
