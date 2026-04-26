import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TechnologiesUsed() {
  return (
    <main className="min-h-screen bg-[#fafaf7] text-[#111111]">
      <Navbar />
      <Container>
        <div className="py-20">
          <h1 className="max-w-3xl text-[34px] font-semibold leading-[1.02] tracking-[-0.045em] text-black sm:text-[42px] lg:text-[56px] mb-8">
            Technologies Used
          </h1>

          <div className="space-y-8">
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              The Smart Observability Middleware leverages cutting-edge technologies to provide enhanced observability and monitoring for distributed systems. The middleware is made up of four key agents: the Metric & Signal Discovery Agent, Log Structuring & Enrichment Agent, Adaptive Alert Tuning Agent, and Anomaly Detection & Insight Agent. Each agent utilizes various technologies to address the specific challenges of modern microservice architectures.
            </p>

            <h2 className="text-[24px] font-semibold text-black mb-4">
              1. Metric & Signal Discovery Agent
            </h2>
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              The Metric & Signal Discovery Agent (MSDA) automatically discovers and configures Key Performance Indicators (KPIs) based on runtime analysis and application code. This agent uses the following technologies:
            </p>
            <ul className="list-disc list-inside text-black/70 space-y-2 text-[14px]">
              <li><strong>Machine Learning for KPI Prediction</strong> - Machine learning models are used to predict and discover missing KPIs based on runtime system behavior and historical data.</li>
              <li><strong>Dynamic Runtime Analysis</strong> - Real-time monitoring and analysis of running services and microservices to automatically identify missing telemetry data or underutilized KPIs.</li>
              <li><strong>Code Instrumentation</strong> - Static and dynamic code analysis techniques are employed to automatically detect required telemetry points within the application code.</li>
              <li><strong>Telemetry Auto-Configuration</strong> - The system automatically updates telemetry configurations to ensure comprehensive coverage across all services, minimizing manual intervention.</li>
            </ul>

            <h2 className="text-[24px] font-semibold text-black mb-4">
              2. Log Structuring & Enrichment Agent
            </h2>
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              The Log Structuring & Enrichment Agent (LSEA) transforms raw, unstructured log data into structured, actionable insights. The technologies used include:
            </p>
            <ul className="list-disc list-inside text-black/70 space-y-2 text-[14px]">
              <li><strong>Template Mining Algorithms</strong> - Log parsing techniques such as Drain3 and Spell are used for template extraction, providing structure to otherwise unstructured log data.</li>
              <li><strong>Large Language Models (LLMs)</strong> - LLM-based semantic classification allows the system to understand the context of logs and enrich them with relevant metadata like trace IDs, session information, and user details.</li>
              <li><strong>Log Redaction</strong> - Privacy-preserving redaction mechanisms are employed to ensure that logs are anonymized, complying with privacy regulations like GDPR while still providing actionable insights.</li>
              <li><strong>Elastic Common Schema (ECS)</strong> - The agent utilizes ECS standards to ensure that logs are standardized and interoperable across different observability tools and platforms.</li>
            </ul>

            <h2 className="text-[24px] font-semibold text-black mb-4">
              3. Adaptive Alert Tuning Agent
            </h2>
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              The Adaptive Alert Tuning Agent (AATA) improves the relevancy of alerts by dynamically adjusting thresholds based on real-time data and historical incident feedback. The technologies utilized include:
            </p>
            <ul className="list-disc list-inside text-black/70 space-y-2 text-[14px]">
              <li><strong>Autonomic Computing Principles</strong> - The agent adapts its behavior based on predefined autonomic computing principles, ensuring a self-healing and self-optimizing approach to alerting.</li>
              <li><strong>Feedback Loops</strong> - The system continuously refines alert thresholds using operator feedback and incident data, ensuring the system learns from past incidents.</li>
              <li><strong>Machine Learning Models</strong> - Ensemble models are used to predict alert relevance and adjust thresholds dynamically based on system behavior and past alert patterns.</li>
              <li><strong>ARIMA Statistical Models</strong> - The use of time-series forecasting models like ARIMA helps the system predict workload patterns and adjust alerts accordingly to reduce false positives during expected spikes.</li>
            </ul>

            <h2 className="text-[24px] font-semibold text-black mb-4">
              4. Anomaly Detection & Insight Agent
            </h2>
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              The Anomaly Detection & Insight Agent (ADIIA) identifies and correlates anomalies across multiple telemetry data sources. It utilizes the following technologies:
            </p>
            <ul className="list-disc list-inside text-black/70 space-y-2 text-[14px]">
              <li><strong>Isolation Forest Algorithm</strong> - A machine learning algorithm used for detecting anomalies by isolating outliers in high-dimensional datasets such as metrics, logs, and traces.</li>
              <li><strong>Random Forest Classifier</strong> - This model helps in scoring incidents and detecting abnormal patterns across various telemetry sources, assisting in root cause analysis.</li>
              <li><strong>Multi-Modal Data Integration</strong> - ADIIA integrates data from logs, metrics, and traces to provide a comprehensive view of anomalies and incidents, facilitating better incident story generation.</li>
              <li><strong>Incident Story Generation</strong> - The agent correlates detected anomalies to generate a human-readable incident story that provides insights into the incident’s cause and impact, helping operators resolve issues quickly.</li>
            </ul>

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