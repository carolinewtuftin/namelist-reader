import type React from "react";
import { useEffect, useState, useRef } from "react";

interface ContactCardProps {
  ssn: string;
  firstName: string;
  lastName: string;
  index: number;
  isNewest?: boolean;
}

const ContactCard: React.FC<ContactCardProps> = ({
  ssn,
  firstName,
  lastName,
  index,
  isNewest = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [index, isVisible]);

  useEffect(() => {
    if (isNewest && cardRef.current && isVisible) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [isNewest, isVisible]);

  return (
    <div
      ref={cardRef}
      className={`contact-card ${isVisible ? "card-visible" : "card-hidden"}`}
    >
      <div className="card-header">
        <div className="window-title">
          {firstName} {lastName}
        </div>
      </div>
      <div className="card-content">
        <table className="data-table">
          <tbody>
            <tr>
              <td className="field-label">SSN:</td>
              <td className="field-value">{ssn}</td>
            </tr>
            <tr>
              <td className="field-label">First:</td>
              <td className="field-value">{firstName}</td>
            </tr>
            <tr>
              <td className="field-label">Last:</td>
              <td className="field-value">{lastName}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactCard;
