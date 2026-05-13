import React, { useRef, useEffect, useState } from 'react';
import { Calendar, Info, ArrowRight, X, MousePointerClick, CheckCircle2, Layers, Briefcase, Box, Table } from 'lucide-react';

const App = () => {
  // 3가지 시나리오 타임라인 데이터 (체크리스트 리서치 보강 완료)
  const scenarios = [
    {
      id: 'spinoff',
      title: '물적분할',
      icon: <Layers className="w-5 h-5" />,
      description: '기존 회사가 특정 사업부문을 떼어내어 100% 자회사를 신설하는 방식입니다.',
      nodes: [
        { phase: '기획 단계', time: 'D-120', date: '2026.09.03', type: 'point', color: 'bg-blue-500', borderColor: 'border-blue-500', textColor: 'text-blue-600',
          details: '분할 목적을 정의하고 분할 대상 자산과 부채를 확정합니다. 또한, 세무적(적격분할 요건 등) 및 법률적 영향을 사전에 면밀히 검토합니다.',
          checklists: [
            '분할재무상태표 및 손익계산서 가결산 진행',
            '적격물적분할 세무요건(과세특례, 취득세 감면 등) 충족 여부 사전 점검',
            '각종 인허가(환경, 제조, 건설 등) 포괄승계 가능 여부 법적 검토',
            '고용승계에 따른 HR 이슈 검토 및 노동조합/노사협의회 소통 계획 수립'
          ] },
        { phase: '이사회 결의', time: 'D-60', date: '2026.11.02', type: 'point', color: 'bg-indigo-500', borderColor: 'border-indigo-500', textColor: 'text-indigo-600',
          details: '분할계획서를 승인하는 이사회를 개최합니다. 이사회 결의 직후 거래소에 물적분할 주요사항보고서를 공시하며 반대주주 주식매수청구권 가격을 산정합니다.',
          checklists: [
            '분할계획서(신설법인 정관, 분할신주, 자산부채 명세 포함) 확정 및 이사회 승인',
            '(상장사) 주요사항보고서 금융위/거래소 제출 및 공시',
            '반대주주 주식매수청구권 매수예정가격 산정 및 공시',
            '주주명부 폐쇄 기준일 결의'
          ] },
        { phase: '주주 확정', time: 'D-45', date: '2026.11.17', type: 'point', color: 'bg-violet-500', borderColor: 'border-violet-500', textColor: 'text-violet-600',
          details: '주주총회에서의 의결권 행사 및 주식매수청구권 행사를 위한 권리 주주를 확정하기 위해 주주명부를 폐쇄합니다.',
          checklists: [
            '주주명부 폐쇄 및 기준일 설정 2주 전 신문/정관 지정 매체 공고',
            '명의개서대리인(예탁결제원 등)에 주주명부 확정 요청 및 수령',
            '주요 기관투자자 대상 의결권 행사 사전 태핑(Tapping)'
          ] },
        { phase: '통지 및 비치', time: 'D-15', date: '2026.12.17', type: 'point', color: 'bg-pink-500', borderColor: 'border-pink-500', textColor: 'text-pink-600',
          details: '주주들에게 주주총회 소집을 통지하며, 물적분할에 반대하는 주주를 위한 주식매수청구권 행사 안내문을 포함합니다. 분할계획서는 본점에 비치합니다.',
          checklists: [
            '주주총회 소집통지서 발송 (주식매수청구권 내용 및 행사방법 명시 필수)',
            '주총 2주 전부터 분할계획서, 대차대조표 등 관련 서류 본점 비치',
            '주주총회 전까지 반대의사 통지 접수처 마련 및 실무 대응 반 편성'
          ] },
        { phase: '주주총회', time: 'D-30', date: '2026.12.02', type: 'point', color: 'bg-purple-500', borderColor: 'border-purple-500', textColor: 'text-purple-600',
          details: '임시 주주총회를 열어 분할계획서 승인에 대한 특별결의(출석 주주 의결권 2/3 이상, 발행주식총수 1/3 이상)를 진행합니다.',
          checklists: [
            '출석 주주 의결권 2/3 및 발행주식총수 1/3 이상 찬성표 확보 (특별결의)',
            '주총 전 반대의사 표시 접수 최종 마감 및 규모 파악',
            '주총 직후부터 주식매수청구권 행사 기간(20일간) 개시 선언'
          ] },
        { phase: '채권자 보호', time: 'D-29 ~ D-1', date: '2026.12.03 ~ 12.31', type: 'range', color: 'bg-orange-500', borderColor: 'border-orange-500', textColor: 'text-orange-600',
          details: '분할로 인해 영향을 받는 채권자들을 보호하기 위해 1개월 이상의 이의제출 기간을 공고하고, 알고 있는 채권자에게는 개별적으로 최고합니다.',
          checklists: [
            '정관에 정한 공고 방법(신문 등)에 따른 채권자 이의제출 기간(1개월 이상) 공고',
            '알고 있는 채권자(금융기관, 주요 거래처 등) 목록 추출 및 개별 최고(내용증명 발송)',
            '(연대책임 면제 시) 이의제출 채권자에 대한 변제, 담보 제공 또는 신탁 조치'
          ] },
        { phase: '분할 기일', time: 'D-Day', date: '2027.01.01', type: 'point', color: 'bg-red-500', borderColor: 'border-red-500', textColor: 'text-red-600',
          details: '실질적인 분할이 실행되는 기준일입니다. 회계상으로 존속법인과 신설법인의 자산 및 부채가 분리됩니다.',
          checklists: [
            '분할기일 기준 분할재무상태표 최종 확정 및 ERP 회계장부 분리',
            '분할대상 자산/부채 배분 실행 및 물리적 재물조사(실사) 완료',
            '신설법인 자본금 및 준비금 장부상 계상'
          ] },
        { phase: '종결 및 등기', time: 'D+2', date: '2027.01.03', type: 'point', color: 'bg-teal-500', borderColor: 'border-teal-500', textColor: 'text-teal-600',
          details: '창립총회를 이사회 결의로 갈음(분할보고 총회)하고, 본점 소재지에서 분할 신설법인의 설립등기 및 존속법인의 변경등기를 진행합니다.',
          checklists: [
            '분할보고총회(존속) 및 창립총회(신설)를 이사회 결의 및 신문 공고로 대체',
            '관할 등기소에 신설법인 설립등기 및 존속법인 변경등기 동시 신청 (본점 2주 內)',
            '사업자등록증 발급 신청 및 법인세/부가세 등 세무서 분할 신고서 제출'
          ] },
      ]
    },
    {
      id: 'transfer',
      title: '영업/자산양수',
      icon: <Briefcase className="w-5 h-5" />,
      description: '현금 출자 등으로 자회사를 먼저 설립한 뒤, 기존 회사의 영업이나 자산을 매매 계약을 통해 넘기는 방식입니다.',
      nodes: [
        { phase: '기획 단계', time: 'D-120', date: '2026.09.03', type: 'point', color: 'bg-blue-500', borderColor: 'border-blue-500', textColor: 'text-blue-600',
          details: '영업/자산 이관의 목적을 명확히 하고 대상을 특정합니다. 자산 양수도에 따른 취득세, 양도소득세 등 세무 부담을 중점적으로 검토합니다.',
          checklists: [
            '영업양수도 대상 자산, 부채, 조직, 계약 목록 세부 획정',
            '양수도 가액 산정을 위한 가치평가 및 외부평가기관 선정 계획 수립',
            '양도소득세, 법인세, 부가세, 취득세 등 세금 부담 시뮬레이션 및 재원 마련',
            '포괄승계가 불가능한 주요 인허가의 신규 취득/갱신 절차 사전 파악'
          ] },
        { phase: '이사회 결의', time: 'D-60', date: '2026.11.02', type: 'point', color: 'bg-indigo-500', borderColor: 'border-indigo-500', textColor: 'text-indigo-600',
          details: '신설법인을 세우기 위한 출자(자본금 마련)를 결의하고, 향후 진행될 영업양수도 계획을 이사회에서 승인합니다.',
          checklists: [
            '신설법인 자본금 조달을 위한 타법인 출자 이사회 결의',
            '영업양수도 기본계획 및 예비 가액 이사회 보고 및 승인',
            '(상장사) \'중요한 영업양수도\' 해당 여부 검토 및 자본시장법상 주요사항공시'
          ] },
        { phase: '신설법인 설립', time: 'D-45', date: '2026.11.17', type: 'point', color: 'bg-violet-500', borderColor: 'border-violet-500', textColor: 'text-violet-600',
          details: '자산을 인수할 주체인 신설 자회사의 설립 절차를 진행합니다. 자본금을 납입하고 발기인 총회를 거쳐 설립 등기를 완료합니다.',
          checklists: [
            '은행에 현금 자본금 납입 및 주금납입보관증명서 발급',
            '발기인 총회 개최, 원시 정관 확정 및 임원 선임',
            '관할 법원에 신설법인 설립등기 완료 및 관할 세무서 사업자등록증 취득'
          ] },
        { phase: '양수도 계약', time: 'D-40', date: '2026.11.22', type: 'point', color: 'bg-pink-500', borderColor: 'border-pink-500', textColor: 'text-pink-600',
          details: '신설법인(양수도인)과 기존법인(양도인) 간에 공식적인 영업 또는 자산 양수도 계약을 체결합니다.',
          checklists: [
            '외부평가기관(회계법인 등)의 영업양수도 가액 평가보고서 최종 수령',
            '공정거래위원회 기업결합신고 요건 검토 및 해당 시 사전 신고서 제출',
            '양 당사자 간 영업양수도 본계약(SPA) 체결 및 계약금 납입 처리'
          ] },
        { phase: '주주총회', time: 'D-30', date: '2026.12.02', type: 'point', color: 'bg-purple-500', borderColor: 'border-purple-500', textColor: 'text-purple-600',
          details: '전체 영업이나 중요한 일부 영업을 양도하는 경우 주주총회 특별결의가 필요합니다. 반대주주의 주식매수청구권 행사도 이때 시작됩니다.',
          checklists: [
            '영업의 전부 또는 중요한 일부 양도에 대한 주주총회 특별결의 진행',
            '이사회 결의로 갈음 가능한 간이/소규모 양수도 요건 충족 여부 최종 확인',
            '반대주주 주식매수청구권 행사 통지 접수 및 매수 대금 확보 방안 마련'
          ] },
        { phase: '이관 기일', time: 'D-Day', date: '2027.01.01', type: 'point', color: 'bg-red-500', borderColor: 'border-red-500', textColor: 'text-red-600',
          details: '실제 자산의 소유권이 넘어가고 영업이 이관되는 날입니다. 양수도 대금의 결제 및 회계 상의 분리 작업이 일어납니다.',
          checklists: [
            '영업양수도 잔금 대금 지급 및 영수증 수취 확인',
            '부가가치세법에 따른 포괄양수도 판단 및 세금계산서 발급/수취 처리',
            '회계상 매각예정자산 계정 대체 및 이관 회계전표(Slip) 최종 승인'
          ] },
        { phase: '영업 이관 완수', time: 'D+30 이내', date: '2027.01.02 ~ 01.31', type: 'range', color: 'bg-cyan-500', borderColor: 'border-cyan-500', textColor: 'text-cyan-600',
          details: '각종 거래처 계약을 신설법인 명의로 변경하고, 임직원 소속 변경, IT 시스템 및 데이터 이관 등을 마무리하여 실질적 영업 이전을 완수합니다.',
          checklists: [
            '개별 거래처/협력사 계약 승계 동의서 징구 및 신설법인 명의 계약 갱신',
            '근로자 개별 동의 기반 고용승계 처리 (퇴직금 중간정산 또는 승계 여부 확정)',
            '금융기관 차입금 등에 대한 채권자 채무인수 동의 확보',
            '각종 동산, 부동산, 지적재산권(특허, 상표 등) 명의 이전 등록 완료'
          ] },
      ]
    },
    {
      id: 'contribution',
      title: '현물출자',
      icon: <Box className="w-5 h-5" />,
      description: '금전 이외의 자산(부동산, 영업권 등)을 출자하여 신주를 교부받는 방식으로 자회사를 설립하거나 규모를 키우는 방식입니다.',
      nodes: [
        { phase: '기획 단계', time: 'D-120', date: '2026.09.03', type: 'point', color: 'bg-blue-500', borderColor: 'border-blue-500', textColor: 'text-blue-600',
          details: '현물출자 대상 자산을 확정하고 개략적인 가치를 산정합니다. 조세특례제한법에 따른 과세특례 요건을 면밀히 검토하는 것이 필수적입니다.',
          checklists: [
            '현물출자 대상 자산(부동산, 특허권, 기계장치 등)의 정확한 권리 명세서 작성',
            '조세특례제한법상 과세이연(이월과세) 요건 완전성 법무/세무법인 크로스 체크',
            '법원 인가 절차, 감정평가 수수료 및 취득세/등록면허세 등 소요 예산 수립'
          ] },
        { phase: '이사회 결의', time: 'D-60', date: '2026.11.02', type: 'point', color: 'bg-indigo-500', borderColor: 'border-indigo-500', textColor: 'text-indigo-600',
          details: '신설법인을 설립하고 자산을 현물출자 하기로 하는 이사회 결의를 진행합니다. 동시에 현물출자 자산의 가치를 평가할 감정인을 선정합니다.',
          checklists: [
            '신설법인 설립 및 현물출자 승인 이사회 결의 (출자재산 및 가액 명시)',
            '법원 보고를 위한 공인된 감정인(감정평가법인, 공인회계사 등) 선정 및 의뢰',
            '예상 출자 자산가액에 따른 신설법인 발행 신주 수량 및 지분율 시뮬레이션'
          ] },
        { phase: '감정평가', time: 'D-50', date: '2026.11.12', type: 'point', color: 'bg-violet-500', borderColor: 'border-violet-500', textColor: 'text-violet-600',
          details: '외부 평가기관을 통해 현물출자 하는 자산의 공정가치를 평가합니다. 자산 과대평가로 인한 자본충실 원칙 훼손을 막기 위함입니다.',
          checklists: [
            '감정평가법인 또는 회계법인의 자산가치 평가를 위한 현장 실사 및 자료 제공',
            '공식 감정평가서 및 현물출자 조사보고서 최종본 수령',
            '자본충실의 원칙에 입각하여 출자재산이 과대평가되지 않았는지 내부 컴플라이언스 검증'
          ] },
        { phase: '법원 조사보고', time: 'D-30', date: '2026.12.02', type: 'point', color: 'bg-pink-500', borderColor: 'border-pink-500', textColor: 'text-pink-600',
          details: '현물출자는 법원이 선임한 검사인 또는 공인된 감정인의 감정결과를 법원에 보고하고 인가를 받아야 하는 엄격한 절차를 거칩니다.',
          checklists: [
            '관할 법원(비송사건)에 감정인 조사보고서 제출 및 인가 신청',
            '법원의 서면 심사 및 자산가치 부당 판단 시 변경 처분에 대한 대비 서류 준비',
            '관할 법원의 최종 현물출자 인가 결정문 수령'
          ] },
        { phase: '출자 이행', time: 'D-10', date: '2026.12.22', type: 'point', color: 'bg-orange-500', borderColor: 'border-orange-500', textColor: 'text-orange-600',
          details: '현물출자 재산의 인도 및 소유권 이전에 필요한 서류(등기 서류 등)를 신설법인 발기인 대표에게 교부하여 출자를 이행합니다.',
          checklists: [
            '발기인 대표에게 현물출자 대상 재산(동산, 장비 등) 실물 인도 완료',
            '부동산의 경우 소유권 이전등기 신청 접수증 등 등기 관련 서류 일체 교부',
            '특허, 상표 등 지적재산권의 경우 특허청 권리이전 등록 서류 교부'
          ] },
        { phase: '설립/증자 기일', time: 'D-Day', date: '2027.01.01', type: 'point', color: 'bg-red-500', borderColor: 'border-red-500', textColor: 'text-red-600',
          details: '현물출자에 의한 신설법인의 설립 등기를 완료하는 시점입니다. 이때 신설법인은 자산을 취득하고, 기존법인은 신설법인의 주식을 취득합니다.',
          checklists: [
            '법원 인가된 가액을 자본금으로 하여 신설법인 설립등기(또는 증자 등기) 접수',
            '법인 등기부등본상 현물출자에 따른 자본금 및 발행주식수 등재 확인',
            '기존 법인의 신설법인 주식(투자유가증권) 취득 및 자산 이관 회계처리 완료'
          ] },
        { phase: '사후 관리', time: 'D+30 이내', date: '2027.01.31 까지', type: 'range', color: 'bg-teal-500', borderColor: 'border-teal-500', textColor: 'text-teal-600',
          details: '취득세 신고 및 납부, 사업자등록, 기타 인허가 및 자산의 완전한 명의개서 등 행정적 후속 조치를 완료합니다.',
          checklists: [
            '조세특례제한법에 따른 취득세 등 지방세 감면 신청 및 세금 납부 완료',
            '관할 세무서에 과세특례(법인세 이월과세 등) 적용 신청서 제출',
            '부동산 등 잔여 등록자산의 최종 소유권 이전등기 완전 접수 및 등기필증 수령'
          ] },
      ]
    }
  ];

  const tabs = [
    ...scenarios,
    { id: 'comparison', title: '방안 비교표', icon: <Table className="w-5 h-5" /> }
  ];

  const [activeTab, setActiveTab] = useState(0);
  const [selectedNode, setSelectedNode] = useState(null);
  const scrollRef = useRef(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

  // 탭 변경 시 차트 스크롤 초기화 및 힌트 재계산
  useEffect(() => {
    if (activeTab < 3) {
      const checkScroll = () => {
        if (scrollRef.current) {
          setShowScrollHint(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
        }
      };
      checkScroll();
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = 0;
      }
      window.addEventListener('resize', checkScroll);
      return () => window.removeEventListener('resize', checkScroll);
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans flex flex-col items-center relative">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
        
        {/* 상단 헤더 영역 */}
        <div className="bg-slate-800 text-white p-6 md:p-8 relative">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">기업 구조개편 방식별 타임라인 및 비교</h1>
          <p className="text-slate-300 flex items-start sm:items-center gap-2 text-sm max-w-4xl leading-relaxed mb-6">
            <Info className="w-4 h-4 shrink-0 mt-0.5 sm:mt-0" />
            기준일(D-Day) 2027년 1월 1일 가상의 일정입니다. 탭을 선택하여 방식별 상세 일정 또는 전체 비교표를 확인하세요.
          </p>

          {/* 시나리오 및 비교표 선택 탭 */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(idx); setSelectedNode(null); }}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-sm transition-all duration-200 ${
                  activeTab === idx 
                    ? tab.id === 'comparison'
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 -translate-y-0.5' 
                      : 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 -translate-y-0.5' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {tab.icon}
                {tab.title}
              </button>
            ))}
          </div>
        </div>

        {/* 조건부 렌더링: 타임라인 (0, 1, 2) vs 비교표 (3) */}
        {activeTab < 3 ? (
          <>
            {/* 현재 선택된 시나리오 설명 영역 */}
            <div className="bg-blue-50/50 border-b border-blue-100 p-4 px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <p className="text-blue-900 font-medium text-sm">
                <span className="font-bold mr-2">{scenarios[activeTab].title}:</span>
                {scenarios[activeTab].description}
              </p>
              {showScrollHint && (
                <div className="flex items-center gap-2 px-3 py-1 bg-white text-blue-600 text-xs font-bold rounded-full border border-blue-200 shadow-sm animate-pulse shrink-0">
                  가로 스크롤 <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>

            {/* 메인 가로 차트 영역 */}
            <div ref={scrollRef} className="w-full overflow-x-auto pb-16 pt-12 scroll-smooth bg-white">
              <div className="relative min-w-[1200px] lg:min-w-full h-[400px] px-12 flex items-center">
                
                {/* 가로 중앙 메인 축 */}
                <div className="absolute left-12 right-12 h-1.5 bg-gray-200 rounded-full top-1/2 -translate-y-1/2 shadow-inner" />

                {/* 개별 노드 렌더링 */}
                {scenarios[activeTab].nodes.map((item, index) => {
                  const isTop = index % 2 === 0;
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col relative h-full justify-center group" style={{ flexBasis: '10%' }}>
                      
                      {/* 노드 점 */}
                      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-4 h-4 rounded-full border-4 border-white shadow-md ${item.color} transition-transform duration-300 group-hover:scale-150`} />

                      {/* 연결선 */}
                      <div className={`absolute left-1/2 -translate-x-1/2 w-0.5 bg-gray-200 transition-all duration-300 group-hover:bg-blue-300 ${isTop ? 'bottom-[50%] h-10 group-hover:h-12' : 'top-[50%] h-10 group-hover:h-12'}`} />

                      {/* 미니 콘텐츠 카드 (클릭 가능) */}
                      <button 
                        onClick={() => setSelectedNode(item)}
                        className={`absolute left-1/2 -translate-x-1/2 w-[160px] bg-white rounded-xl shadow border-t-4 ${item.borderColor} p-3 transition-all duration-300 z-20 hover:-translate-y-1 hover:shadow-xl hover:border-blue-400 cursor-pointer text-left ${isTop ? 'bottom-[calc(50%+2.5rem)] hover:bottom-[calc(50%+3rem)]' : 'top-[calc(50%+2.5rem)] hover:top-[calc(50%+3rem)]'}`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className={`px-2 py-0.5 text-[10px] font-bold text-white rounded shadow-sm ${item.color}`}>
                            {item.time}
                          </span>
                          <MousePointerClick className="w-3 h-3 text-gray-400 group-hover:text-blue-500 group-hover:animate-bounce" />
                        </div>
                        <h3 className={`font-bold text-sm mb-1 ${item.textColor} truncate`}>
                          {item.phase}
                        </h3>
                        <div className="text-[10px] font-semibold text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {item.date}
                        </div>
                      </button>

                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          /* 비교표 렌더링 영역 */
          <div className="p-4 md:p-8 bg-white overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse border border-gray-200 shadow-sm rounded-lg overflow-hidden">
              <thead className="bg-slate-50 border-b-2 border-slate-200">
                <tr>
                  <th className="p-4 text-left font-bold text-slate-800 w-1/4 border-r border-gray-200">구분</th>
                  <th className="p-4 text-left font-bold text-blue-700 w-1/4 border-r border-gray-200"><div className="flex items-center gap-2"><Layers className="w-4 h-4"/>물적분할</div></th>
                  <th className="p-4 text-left font-bold text-blue-700 w-1/4 border-r border-gray-200"><div className="flex items-center gap-2"><Briefcase className="w-4 h-4"/>법인설립 후 영업/자산양수</div></th>
                  <th className="p-4 text-left font-bold text-blue-700 w-1/4"><div className="flex items-center gap-2"><Box className="w-4 h-4"/>신설법인 설립 후 현물출자</div></th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                <tr className="border-b border-gray-200 hover:bg-blue-50/30 transition-colors">
                  <td className="p-4 font-bold bg-slate-50 border-r border-gray-200">근거 법률 및 절차</td>
                  <td className="p-4 border-r border-gray-200">상법상 회사분할 절차 적용 (엄격함)</td>
                  <td className="p-4 border-r border-gray-200">상법상 영업양수도 또는 일반 자산매매 계약</td>
                  <td className="p-4">상법상 현물출자 절차 적용 (감정인 검사 등)</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-blue-50/30 transition-colors">
                  <td className="p-4 font-bold bg-slate-50 border-r border-gray-200">주주총회 및 매수청구권</td>
                  <td className="p-4 border-r border-gray-200">
                    <span className="text-red-500 font-semibold">주총 특별결의 필수</span><br/>
                    반대주주 주식매수청구권 부여
                  </td>
                  <td className="p-4 border-r border-gray-200">
                    <span className="text-orange-500 font-semibold">'중요한 영업'의 양도시 주총 특별결의</span><br/>
                    (단순 자산매매의 경우 이사회 결의로 가능)
                  </td>
                  <td className="p-4">
                    정관에 정함이 없는 한 <span className="text-emerald-600 font-semibold">이사회 결의로 진행</span><br/>
                    (주주총회 불필요, 매수청구권 미발생)
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-blue-50/30 transition-colors">
                  <td className="p-4 font-bold bg-slate-50 border-r border-gray-200">채권자 보호 절차</td>
                  <td className="p-4 border-r border-gray-200">
                    원칙적 연대책임.<br/>면책적 분할 시 <span className="font-semibold text-red-500">채권자 보호절차(공고/최고) 필수</span>
                  </td>
                  <td className="p-4 border-r border-gray-200">
                    법적 채권자보호절차 없음.<br/>(단, 채무 인수 시 개별 채권자 동의 필요)
                  </td>
                  <td className="p-4">
                    법적 채권자보호절차 없음.<br/>(마찬가지로 개별 채무 인수 시 채권자 동의 요건)
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-blue-50/30 transition-colors">
                  <td className="p-4 font-bold bg-slate-50 border-r border-gray-200">인허가 등 승계</td>
                  <td className="p-4 border-r border-gray-200">
                    원칙적으로 <span className="text-emerald-600 font-semibold">포괄 승계됨</span><br/>
                    (개별 법령에 따라 예외 존재)
                  </td>
                  <td className="p-4 border-r border-gray-200">
                    원칙적으로 <span className="text-red-500 font-semibold">개별적 이전 및 신규 취득 필요</span>
                  </td>
                  <td className="p-4">
                    원칙적으로 <span className="text-red-500 font-semibold">개별적 이전 및 신규 취득 필요</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-blue-50/30 transition-colors">
                  <td className="p-4 font-bold bg-slate-50 border-r border-gray-200">조세 특례 (세무)</td>
                  <td className="p-4 border-r border-gray-200">
                    적격분할 요건 충족 시 <span className="font-semibold text-emerald-600">법인세 과세이연, 취득세 감면 등 혜택 큼</span>
                  </td>
                  <td className="p-4 border-r border-gray-200">
                    자산 양도차익 법인세, 취득세 과세.<br/>(적격 요건 충족 어려움 및 혜택 제한적)
                  </td>
                  <td className="p-4">
                    적격현물출자 요건 충족 시 양도차익 과세이연 등 혜택 가능
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-blue-50/30 transition-colors">
                  <td className="p-4 font-bold bg-slate-50 border-r border-gray-200">법원 인가 등 규제</td>
                  <td className="p-4 border-r border-gray-200">없음</td>
                  <td className="p-4 border-r border-gray-200">없음</td>
                  <td className="p-4">
                    <span className="text-red-500 font-semibold">법원 감정인 선임 및 조사보고 필수</span><br/>
                    (기간 소요 및 절차적 부담 큼)
                  </td>
                </tr>
                <tr className="hover:bg-blue-50/30 transition-colors bg-gray-50/50">
                  <td className="p-4 font-bold bg-slate-50 border-r border-gray-200">장단점 요약</td>
                  <td className="p-4 border-r border-gray-200">
                    <span className="text-blue-600 font-semibold">[장점]</span> 권리의무 포괄승계로 사후처리 용이, 세제혜택<br/>
                    <span className="text-red-600 font-semibold">[단점]</span> 주총 특별결의 및 반대주주 매수청구권 부담
                  </td>
                  <td className="p-4 border-r border-gray-200">
                    <span className="text-blue-600 font-semibold">[장점]</span> 원하는 자산/부채만 선별적 양수도 가능<br/>
                    <span className="text-red-600 font-semibold">[단점]</span> 세금 부담 발생 가능성, 개별 계약 및 이전 등 실무상 번거로움
                  </td>
                  <td className="p-4">
                    <span className="text-blue-600 font-semibold">[장점]</span> 현금 동원 없이 규모 확대 가능, 이사회 결의만으로 신속 진행(주총 없음)<br/>
                    <span className="text-red-600 font-semibold">[단점]</span> 법원의 엄격한 검사 절차로 시간 및 비용 소요
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 세부내용 팝업 (Modal) - 타임라인 탭에서만 활성화 */}
      {selectedNode && activeTab < 3 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedNode(null)}
          />
          
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className={`${selectedNode.color} p-5 text-white flex justify-between items-start shrink-0`}>
              <div>
                <span className="inline-block px-2 py-1 bg-white/20 rounded text-xs font-bold mb-2">
                  {selectedNode.time} | {selectedNode.date}
                </span>
                <h2 className="text-2xl font-bold">{selectedNode.phase}</h2>
              </div>
              <button 
                onClick={() => setSelectedNode(null)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-500" /> 세부 진행 내용
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                {selectedNode.details}
              </p>

              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 실무 체크리스트
              </h4>
              <ul className="space-y-3 bg-emerald-50/30 p-4 rounded-xl border border-emerald-100">
                {selectedNode.checklists.map((check, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span className="leading-snug">{check}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-end shrink-0">
              <button 
                onClick={() => setSelectedNode(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-lg transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;