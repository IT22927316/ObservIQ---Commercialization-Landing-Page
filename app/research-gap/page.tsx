import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ResearchGap() {
  return (
    <main className="min-h-screen bg-[#fafaf7] text-[#111111]">
      <Navbar />
      <Container>
        <div className="py-20">
          <h1 className="max-w-3xl text-[34px] font-semibold leading-[1.02] tracking-[-0.045em] text-black sm:text-[42px] lg:text-[56px] mb-8">
            Research Gap
          </h1>

          <div className="space-y-8">
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              The synthesis of literature and industry practices reveals several fundamental gaps that current observability solutions fail to bridge. These gaps span architectural, operational, and semantic deficiencies. Addressing these gaps is crucial to developing a more adaptable and effective observability framework capable of addressing the challenges presented by modern microservice-based architectures.
            </p>

            <h2 className="text-[24px] font-semibold text-black mb-4">
              1. Static and Rigid Thresholding
            </h2>
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              One of the most significant gaps identified is the prevalence of static and rigid thresholding within current monitoring tools like Prometheus Alertmanager and Nagios. These systems rely on manually configured rules that do not evolve with changing workload patterns or seasonal traffic fluctuations. This rigidity causes high false positive rates, which erode operator trust in the system and contribute significantly to the problem of alert fatigue.
            </p>

            <h2 className="text-[24px] font-semibold text-black mb-4">
              2. Upstream Identification of Telemetry Requirements
            </h2>
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              A second gap exists in the upstream identification of telemetry requirements. Most research focuses on the downstream analysis of collected signals, such as anomaly detection, while assuming that the correct KPIs were already being captured. However, manual instrumentation often omits essential metrics like latency or throughput for specific endpoints. This creates persistent monitoring blind spots that delay incident detection and hinder the overall effectiveness of observability systems.
            </p>

            <h2 className="text-[24px] font-semibold text-black mb-4">
              3. Absence of Feedback Integration in Adaptive Monitoring Models
            </h2>
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              Thirdly, there is a marked absence of feedback integration in adaptive monitoring models. While some models adjust based on statistical shifts, few incorporate historical incident outcomes or direct operator responses into future configurations. This prevents alerts from improving their relevance and accuracy over time based on actual human triage actions. The lack of a feedback-driven mechanism to adjust thresholds dynamically results in the ongoing reliance on static alerting systems, which remain disconnected from the realities of the systems they monitor.
            </p>

            <h2 className="text-[24px] font-semibold text-black mb-4">
              4. Lack of Contextual, Cross-Signal Correlation
            </h2>
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              Another significant gap is the lack of contextual, cross-signal correlation in many machine learning frameworks for anomaly detection. These frameworks often operate on isolated signals (metrics or logs) rather than integrating the full telemetry context. Without correlating signals across metrics, logs, and traces, a single incident can generate multiple fragmented alerts, making it difficult for responders to identify the originating fault, especially in cascading failures. This gap leads to inefficiencies in diagnosis and recovery, prolonging the mean time to resolution (MTTR).
            </p>

            <h2 className="text-[24px] font-semibold text-black mb-4">
              5. Lack of Contextual Storytelling in Incident Reports
            </h2>
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              Finally, current observability systems are effective at flagging that an anomaly occurred but are poor at explaining the magnitude, extent, and chronology of the event in a human-readable format. This "context-blindness" forces DevOps and SRE teams to manually investigate causal relationships between fragmented signals. Such approaches increase the MTTR, which is detrimental to operational efficiency. The ability to generate coherent, narrative-driven incident stories is essential for providing actionable insights and improving response times.
            </p>

            <h2 className="text-[24px] font-semibold text-black mb-4">
              Formal Formulation of the Research Problem
            </h2>
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              The core research problem identified is the absence of a unified, adaptive middleware framework capable of autonomously transforming static, siloed, and noisy telemetry into context-rich, proactive observability insights. Modern microservice-based architectures generate massive volumes of heterogeneous data, but the tools used to manage them remain reactive and fragmented. This research aims to bridge these gaps by addressing the following fundamental sub-challenges:
            </p>

            <ul className="list-disc list-inside text-black/70 space-y-2 text-[14px]">
              <li>How to automatically discover and configure missing KPIs at both the code and runtime levels to eliminate monitoring blind spots without requiring extensive manual intervention.</li>
              <li>How to move from rigid, static alerting to a feedback-driven mechanism that autonomously refines thresholds and suppresses noise by learning from historical operator responses.</li>
              <li>How to synthesize fragmented anomalies across disparate telemetry streams (logs, metrics, traces) into a coherent, actionable narrative that explains the root cause and impact of system incidents.</li>
            </ul>

            <h2 className="text-[24px] font-semibold text-black mb-4">
              Research Objectives and Solution
            </h2>
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              The primary objective of this research is to design and implement a Smart Observability Middleware that enhances the monitoring and reliability of microservice-based systems through intelligent automation and machine learning. The goal is to provide a solution that autonomously discovers relevant telemetry, tunes alert thresholds based on feedback, and correlates anomalies across multiple sources to generate coherent incident narratives.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mt-8">
              <h3 className="text-[18px] font-semibold text-black mb-3">
                References
              </h3>
              <ul className="list-disc list-inside text-black/70 space-y-2 text-[14px]">
                <li><a href="https://arxiv.org/abs/2302.06648" target="_blank" rel="noopener noreferrer">Zhang & Wu (2021) - "Prototype-Level Automation for Cloud Observability"</a></li>
                <li><a href="https://techscience.com" target="_blank" rel="noopener noreferrer">DeepLog: Anomaly Detection and Diagnosis from System Logs through Deep Learning</a></li>
                <li><a href="https://github.com/logpai/Drain3" target="_blank" rel="noopener noreferrer">Drain3: Robust Streaming Log Template Miner</a></li>
                <li><a href="https://researchgate.net" target="_blank" rel="noopener noreferrer">MicroHECL: High-Efficient Root Cause Localization</a></li>
                <li><a href="https://techrxiv.org" target="_blank" rel="noopener noreferrer">Nezha: Fine-Grained Root Causes Analysis for Microservices</a></li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  );
}