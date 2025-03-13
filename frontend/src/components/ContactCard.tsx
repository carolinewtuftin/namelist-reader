import type React from "react";
import { useEffect, useState } from "react";

interface ContactCardProps {
  ssn: string;
  firstName: string;
  lastName: string;
  index: number;
}

const ContactCard: React.FC<ContactCardProps> = ({
  ssn,
  firstName,
  lastName,
  index,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [index, isVisible]);

  return (
    <div
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
