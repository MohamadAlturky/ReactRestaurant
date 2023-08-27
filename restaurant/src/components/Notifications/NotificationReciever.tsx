import { useEffect, useState } from "react";
import SignalRService from "../../services/SignalRService";
import NotificationToast from "../notificationToast/NotificationToast";

export default function NotificationReciever() {
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);

  useEffect(() => {
    SignalRService.startConnection();

    SignalRService.addNotificationListener(
      (messageSubject: string, messageContent: string, sentAt: string) => {
        let notification: NotificationMessage = {
          messageSubject: messageSubject,
          messageContent: messageContent,
          sentAt: sentAt,
        };
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          notification,
        ]);
      }
    );

    return () => {
      SignalRService.stopConnection();
    };
  }, []);

  return (
    <div className="container">
      <h1 className="row d-flex justify-content-center mt-5">الإشعارات</h1>
      <ul className="d-flex flex-column justify-content-center mt-3 align-items-center">
        {notifications.map((notification, index) => (
          <div className="d-flex justify-content-center" key={index}>
            <NotificationToast
              sentAt={notification.sentAt}
              messageContent={notification.messageContent}
              messageSubject={notification.messageSubject}
            />
          </div>
        ))}
      </ul>
    </div>
  );
}
