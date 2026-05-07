"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Circle, FileText, Store, MapPin, Send } from "lucide-react";

type WizardData = {
  businessName: string;
  category: string;
  phone: string;
  address: string;
  detailAddress: string;
  openingHours: string;
  intro: string;
  ownerName: string;
  registrationNumber: string;
  verificationMethod: "문자" | "전화" | "이메일";
};

const initialData: WizardData = {
  businessName: "",
  category: "",
  phone: "",
  address: "",
  detailAddress: "",
  openingHours: "",
  intro: "",
  ownerName: "",
  registrationNumber: "",
  verificationMethod: "문자",
};

const steps = ["기본 정보", "매장 정보", "서류/인증", "검토/제출"];

export default function SmartPlaceWizardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<WizardData>(initialData);

  const completion = useMemo(() => {
    const required = [
      data.businessName,
      data.category,
      data.phone,
      data.address,
      data.ownerName,
      data.registrationNumber,
    ];
    const done = required.filter(Boolean).length;
    return Math.round((done / required.length) * 100);
  }, [data]);

  const updateField = <K extends keyof WizardData>(key: K, value: WizardData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const next = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const submit = () => {
    setSubmitted(true);
  };

  return (
    <main className="container">
      <section className="card hero">
        <h1>스마트플레이스 등록 마법사</h1>
        <p>사업자 정보를 단계별로 입력하고, 검토 후 한 번에 제출하세요.</p>
        <div className="progressWrap" aria-label="진행률">
          <div className="progressBar" style={{ width: `${completion}%` }} />
        </div>
        <small>필수 입력 완료율 {completion}%</small>
      </section>

      <section className="card">
        <ol className="stepList">
          {steps.map((step, i) => (
            <li key={step} className={i === currentStep ? "active" : i < currentStep ? "done" : ""}>
              {i < currentStep ? <CheckCircle2 size={16} /> : <Circle size={16} />}
              <span>{step}</span>
            </li>
          ))}
        </ol>

        {!submitted ? (
          <div className="formArea">
            {currentStep === 0 && (
              <>
                <h2><Store size={18} /> 기본 정보</h2>
                <label>상호명<input value={data.businessName} onChange={(e) => updateField("businessName", e.target.value)} placeholder="예: 코덱스 브런치" /></label>
                <label>업종<input value={data.category} onChange={(e) => updateField("category", e.target.value)} placeholder="예: 브런치 카페" /></label>
                <label>대표 연락처<input value={data.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="예: 02-123-4567" /></label>
              </>
            )}

            {currentStep === 1 && (
              <>
                <h2><MapPin size={18} /> 매장 정보</h2>
                <label>주소<input value={data.address} onChange={(e) => updateField("address", e.target.value)} placeholder="도로명 주소" /></label>
                <label>상세 주소<input value={data.detailAddress} onChange={(e) => updateField("detailAddress", e.target.value)} placeholder="층/호수" /></label>
                <label>영업시간<input value={data.openingHours} onChange={(e) => updateField("openingHours", e.target.value)} placeholder="예: 매일 09:00~21:00" /></label>
                <label>매장 소개<textarea value={data.intro} onChange={(e) => updateField("intro", e.target.value)} placeholder="고객에게 보여줄 매장 소개" /></label>
              </>
            )}

            {currentStep === 2 && (
              <>
                <h2><FileText size={18} /> 서류 / 인증</h2>
                <label>대표자명<input value={data.ownerName} onChange={(e) => updateField("ownerName", e.target.value)} placeholder="사업자등록증 상 대표자" /></label>
                <label>사업자등록번호<input value={data.registrationNumber} onChange={(e) => updateField("registrationNumber", e.target.value)} placeholder="000-00-00000" /></label>
                <label>인증 방식
                  <select value={data.verificationMethod} onChange={(e) => updateField("verificationMethod", e.target.value as WizardData["verificationMethod"])}>
                    <option value="문자">문자 인증</option>
                    <option value="전화">전화 인증</option>
                    <option value="이메일">이메일 인증</option>
                  </select>
                </label>
              </>
            )}

            {currentStep === 3 && (
              <>
                <h2><Send size={18} /> 검토 / 제출</h2>
                <ul className="review">
                  <li><strong>상호명</strong><span>{data.businessName || "미입력"}</span></li>
                  <li><strong>업종</strong><span>{data.category || "미입력"}</span></li>
                  <li><strong>연락처</strong><span>{data.phone || "미입력"}</span></li>
                  <li><strong>주소</strong><span>{[data.address, data.detailAddress].filter(Boolean).join(" ") || "미입력"}</span></li>
                  <li><strong>영업시간</strong><span>{data.openingHours || "미입력"}</span></li>
                  <li><strong>인증 방식</strong><span>{data.verificationMethod}</span></li>
                </ul>
              </>
            )}

            <div className="actions">
              <button type="button" onClick={prev} disabled={currentStep === 0}>이전</button>
              {currentStep < steps.length - 1 ? (
                <button type="button" onClick={next}>다음</button>
              ) : (
                <button type="button" onClick={submit}>등록 신청 제출</button>
              )}
            </div>
          </div>
        ) : (
          <div className="success">
            <CheckCircle2 size={42} />
            <h2>제출이 완료되었습니다</h2>
            <p>입력하신 내용으로 스마트플레이스 등록 심사가 진행됩니다.</p>
          </div>
        )}
      </section>
    </main>
  );
}
