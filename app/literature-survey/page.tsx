import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LiteratureSurvey() {
  return (
    <main className="min-h-screen bg-[#fafaf7] text-[#111111]">
      <Navbar />
      <Container>
        <div className="py-20">
          <h1 className="max-w-3xl text-[34px] font-semibold leading-[1.02] tracking-[-0.045em] text-black sm:text-[42px] lg:text-[56px] mb-8">
            Literature Survey
          </h1>

          <div className="space-y-8">
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              This section provides a comprehensive review of existing academic and industry work related to observability, monitoring systems, anomaly detection, and intelligent system interpretation. The transition from monolithic architectures to cloud-native microservices has introduced a monumental shift in operational practices, necessitating more advanced observability tools to handle the scale and complexity of modern distributed systems.
            </p>

            <h2 className="text-[24px] font-semibold text-black mb-4">
              Key Findings from Academic Research
            </h2>
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              The evolution of observability has moved beyond basic availability monitoring to a deep introspection of internal system states <a href="#ref-1" className="text-blue-600 hover:underline">[1]</a>. Traditional systems based on static thresholds and isolated signal analysis are unable to keep up with the dynamic nature of microservice architectures <a href="#ref-1" className="text-blue-600 hover:underline">[1]</a>. Research suggests that these tools often miss critical insights, leading to operational inefficiencies, excessive alert fatigue, and delayed recovery times during outages <a href="#ref-1" className="text-blue-600 hover:underline">[1]</a>. The solution proposed by recent research is a decentralized, autonomous middleware capable of continuously adapting to system behaviors without manual intervention <a href="#ref-1" className="text-blue-600 hover:underline">[1]</a>.
            </p>

            <h2 className="text-[24px] font-semibold text-black mb-4">
              Industry Practices
            </h2>
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              Industry-standard observability platforms like Prometheus, Nagios, and ELK are widely used in monitoring microservices, but they have limitations. These tools often generate a high volume of alerts, many of which are non-actionable, contributing to alert fatigue among DevOps teams <a href="#ref-1" className="text-blue-600 hover:underline">[1]</a>. These systems rely on manually configured thresholds, which fail to account for fluctuations in workload and system scaling, often leading to unnecessary noise in monitoring data. The introduction of adaptive feedback loops in observability systems can help mitigate these challenges by continuously tuning thresholds and reducing alert fatigue <a href="#ref-1" className="text-blue-600 hover:underline">[1]</a>.
            </p>

            <h2 className="text-[24px] font-semibold text-black mb-4">
              Emerging Trends
            </h2>
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              The integration of AI and machine learning techniques into observability systems is an emerging trend aimed at improving anomaly detection and operational insights <a href="#ref-2" className="text-blue-600 hover:underline">[2]</a>. AI models, such as Isolation Forest, have shown promise in detecting anomalies in high-dimensional telemetry data <a href="#ref-2" className="text-blue-600 hover:underline">[2]</a>. However, these systems often lack system-level context, making it difficult for operators to understand the root causes of incidents <a href="#ref-4" className="text-blue-600 hover:underline">[4]</a><a href="#ref-5" className="text-blue-600 hover:underline">[5]</a>. Future observability systems must evolve to not only detect anomalies but also provide actionable insights by correlating data from multiple sources (metrics, logs, traces) <a href="#ref-4" className="text-blue-600 hover:underline">[4]</a><a href="#ref-5" className="text-blue-600 hover:underline">[5]</a>.
            </p>

            <h2 className="text-[24px] font-semibold text-black mb-4">
              The Four Key Agents in Observability
            </h2>
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              The proposed observability framework introduces four autonomous agents, each addressing a different aspect of modern observability:
            </p>

            <h3 className="text-[16px] font-semibold text-black/90 mb-4">
              1. Metric & Signal Discovery Agent
            </h3>
            <p className="w-full text-[13px] leading-7 text-black/45 mb-6">
              The Metric & Signal Discovery Agent (MSDA) is responsible for identifying missing or suboptimal KPIs across a distributed system <a href="#ref-1" className="text-blue-600 hover:underline">[1]</a>. It autonomously discovers telemetry signals by analyzing both application source code and runtime behavior. This agent ensures that essential metrics such as latency, traffic, and errors are consistently collected, even as new services and APIs are introduced. MSDA uses route-intent classification to map API routes to specific KPIs based on the operational purpose of each endpoint, thereby reducing the need for manual instrumentation <a href="#ref-1" className="text-blue-600 hover:underline">[1]</a>.
            </p>

            <h3 className="text-[16px] font-semibold text-black/90 mb-4">
              2. Log Structure & Enrichment Agent
            </h3>
            <p className="w-full text-[13px] leading-7 text-black/45 mb-6">
              The Log Structure & Enrichment Agent (LSEA) transforms unstructured logs into structured, semantically enriched data. It uses techniques such as template mining <a href="#ref-3" className="text-blue-600 hover:underline">[3]</a> and large language model (LLM)-driven semantic classification to convert raw log data into actionable insights <a href="#ref-2" className="text-blue-600 hover:underline">[2]</a>. Additionally, it applies privacy-preserving redaction techniques to ensure compliance with data protection regulations like GDPR. By enriching logs with contextual metadata (e.g., trace_id, user session), LSEA enables better cross-service debugging and root cause analysis <a href="#ref-4" className="text-blue-600 hover:underline">[4]</a>.
            </p>

            <h3 className="text-[16px] font-semibold text-black/90 mb-4">
              3. Adaptive Alert Tuning Agent
            </h3>
            <p className="w-full text-[13px] leading-7 text-black/45 mb-6">
              Alert fatigue is a significant challenge in modern monitoring systems <a href="#ref-1" className="text-blue-600 hover:underline">[1]</a>. The Adaptive Alert Tuning Agent (AATA) addresses this by dynamically adjusting alert thresholds based on historical data and real-time feedback from operators. By learning from previous incidents and adjusting thresholds accordingly, AATA helps reduce false positives and ensures that alerts are both timely and actionable. This self-healing feedback loop ensures that alert configurations evolve alongside changes in system behavior <a href="#ref-1" className="text-blue-600 hover:underline">[1]</a>.
            </p>

            <h3 className="text-[16px] font-semibold text-black/90 mb-4">
              4. Anomaly Detection & Insight Agent
            </h3>
            <p className="w-full text-[13px] leading-7 text-black/45 mb-6">
              The Anomaly Detection & Insight Agent (ADIIA) uses machine learning models to detect anomalies across multiple telemetry sources <a href="#ref-2" className="text-blue-600 hover:underline">[2]</a>. By correlating metrics, logs, and traces, ADIIA generates cohesive incident stories that explain the root cause of system failures <a href="#ref-4" className="text-blue-600 hover:underline">[4]</a><a href="#ref-5" className="text-blue-600 hover:underline">[5]</a>. Unlike traditional anomaly detection systems, which operate in isolation, ADIIA integrates data from different signals to provide context-rich incident reports, helping DevOps and SRE teams to resolve issues faster and more accurately <a href="#ref-5" className="text-blue-600 hover:underline">[5]</a>.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mt-8">
              <h3 className="text-[18px] font-semibold text-black mb-3">
                References
              </h3>
              <ol className="list-decimal list-inside text-black/70 space-y-2 text-[14px]">
                <li id="ref-1"><a href="https://arxiv.org/abs/2302.06648" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Zhang & Wu (2021) - "Prototype-Level Automation for Cloud Observability"</a></li>
                <li id="ref-2"><a href="https://techscience.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">DeepLog: Anomaly Detection and Diagnosis from System Logs through Deep Learning</a></li>
                <li id="ref-3"><a href="https://github.com/logpai/Drain3" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Drain3: Robust Streaming Log Template Miner</a></li>
                <li id="ref-4"><a href="https://researchgate.net" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">MicroHECL: High-Efficient Root Cause Localization</a></li>
                <li id="ref-5"><a href="https://techrxiv.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Nezha: Fine-Grained Root Causes Analysis for Microservices</a></li>
              </ol>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  );
}