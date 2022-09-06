import styles from "styles/components/Tabs/SerivcesTab.module.scss";
import { Card, Button, CheckBox } from "components";
import { useState } from "react";

interface Service {
  name: string;
  enabled: boolean;
}

interface ServicesTabPorps {
  children?: React.ReactNode;
  className?: string;
  services?: Service[];
}

interface ServiceProps {
  isEdit?: boolean;
  onEdit?: () => void;
  onAdd?: () => void;
  onDelete?: () => void;
}

const ServiceActions = ({ onEdit, onAdd, isEdit, onDelete }: ServiceProps) => {
  return (
    <div className={styles.branchActions}>
      <Button
        onClick={onEdit}
        variant="outline"
        label={isEdit ? "Cancel" : "Edit"}
        size="large"
      />
      <Button
        onClick={isEdit ? onDelete : onAdd}
        variant="fill"
        label={isEdit ? "Save" : "Add service"}
        size="large"
      />
    </div>
  );
};

export default function ServicesTab({
  children,
  className,
  services = [],
  ...props
}: ServicesTabPorps) {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Card
      cardTitle="Services"
      cardActions={
        <ServiceActions isEdit={isEdit} onEdit={() => setIsEdit(!isEdit)} />
      }
    >
      <div className={styles.servicesContainer}>
        {services.map((service, i) => (
          <CheckBox
            id={"service" + service.name + i}
            key={"service" + service.name + i}
            label={service.name}
            defaultChecked={service.enabled}
          ></CheckBox>
        ))}
      </div>
    </Card>
  );
}
