import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button, Toast } from "@/components";

import styles from "./EditableField.module.scss";

export enum FieldType {
  EMAIL = "email",
  NAME = "name",
  SURNAME = "surname",
}

interface EditableFieldProps {
  value: string;
  type: FieldType;
}

export const EditableField = ({ value, type }: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        body: JSON.stringify({ [type]: localValue }),
      });
      if (response.ok) {
        const data = await response.json();
        setLocalValue(data[type] || localValue);
        Toast("Dane zaktualizowane", "success");
        router.refresh();
      }
    } catch {
      Toast("Nie udało się zaktualizować danych", "error");
    }
  };
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        value={localValue}
        onFocus={handleEdit}
        onChange={(e) => setLocalValue(e.target.value)}
      />
      <Button
        onClick={handleSave}
        disabled={!isEditing}
        className={clsx(styles.button, isEditing && styles.editing)}
      >
        Zapisz
      </Button>
    </div>
  );
};
