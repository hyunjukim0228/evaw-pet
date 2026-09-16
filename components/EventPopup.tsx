"use client";

import { useEffect, useState } from "react";
import { useConsultModal } from "./ConsultModalContext";

// STEP7: 첫 방문 팝업 — 이미지 확보 전까지는 렌더링하지 않음(POPUP_IMAGE가 비어있으면 컴포넌트 자체가 null).
// 이미지가 생기면 이 상수만 채우면 팝업이 자동으로 뜸.
const POPUP_IMAGE = ""; // 예: "/images/popup/event.webp"
const DISMISS_KEY = "eventPopupDismissedDate";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export default function EventPopup() {
  const { isOpen: consultOpen, open: openConsult } = useConsultModal();
  const [visible, setVisible] = useState(false);

  // localStorage는 SSR에 없고 접근 자체가 실패할 수 있어(프라이빗 모드 등) try/catch로 감싸고,
  // useEffect 안에서만(클라이언트 마운트 후) 접근 — 정적 export라 이 컴포넌트 자체가 클라이언트에서만 판단.
  useEffect(() => {
    if (!POPUP_IMAGE) return;
    try {
      const dismissed = window.localStorage.getItem(DISMISS_KEY);
      if (dismissed === todayStr()) return;
    } catch {
      // localStorage 접근 실패 시 그냥 보여줌(차단 기능만 못 쓰는 것으로 완화)
    }
    setVisible(true);
  }, []);

  // 상담모달이 열리면 팝업은 닫아 동시에 뜨지 않게 함.
  useEffect(() => {
    if (consultOpen) setVisible(false);
  }, [consultOpen]);

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!POPUP_IMAGE || !visible) return null;

  function dismissToday() {
    try {
      window.localStorage.setItem(DISMISS_KEY, todayStr());
    } catch {
      // 저장 실패해도 이번 방문에서만 닫히는 것으로 충분
    }
    setVisible(false);
  }

  return (
    <div className="popup-overlay" role="dialog" aria-modal="true" aria-label="이벤트 안내" onClick={() => setVisible(false)}>
      <div className="popup-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" aria-label="닫기" onClick={() => setVisible(false)}>
          ×
        </button>
        <img src={POPUP_IMAGE} alt="이벤트 안내" className="popup-image" />
        <div className="popup-actions">
          <button
            type="button"
            className="btn btn-primary btn-lg btn-full"
            onClick={() => {
              setVisible(false);
              openConsult();
            }}
          >
            🎓 무료 상담 신청하기
          </button>
          <button type="button" className="popup-dismiss-today" onClick={dismissToday}>
            오늘 하루 보지 않기
          </button>
        </div>
      </div>
    </div>
  );
}
