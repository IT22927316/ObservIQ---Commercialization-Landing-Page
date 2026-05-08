import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Methodology() {
  return (
    <main className="min-h-screen bg-[#fafaf7] text-[#111111]">
      <Navbar />
      <Container>
        <div className="py-20">
          <h1 className="max-w-3xl text-[34px] font-semibold leading-[1.02] tracking-[-0.045em] text-black sm:text-[42px] lg:text-[56px] mb-8">
            Methodology
          </h1>

          <div className="space-y-8">
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              The methodology of this research revolves around the development and implementation of a Smart Observability Middleware <a href="#ref-1" className="text-blue-600 hover:underline">[1]</a>. This middleware includes four distinct but complementary agents, each addressing a different facet of modern observability challenges. The research aims to build a scalable, adaptive, and autonomous system that can seamlessly integrate into existing DevOps pipelines to improve observability in microservice architectures.
            </p>

            <h2 className="text-[24px] font-semibold text-black mb-4">
              1. Metric & Signal Discovery Agent
            </h2>
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              The methodology for the Metric & Signal Discovery Agent (MSDA) focuses on automating the discovery and collection of relevant telemetry signals across microservices <a href="#ref-1" className="text-blue-600 hover:underline">[1]</a>. To achieve this, we will:
            </p>
            <ul className="list-disc list-inside text-black/70 space-y-2 text-[14px]">
              <li>Perform static and dynamic program analysis on service code to identify missing KPIs <a href="#ref-1" className="text-blue-600 hover:underline">[1]</a>.</li>
              <li>Implement a route-intent classification module that maps API routes to semantic intent categories, allowing the agent to autonomously recommend KPIs based on the operational role of an endpoint <a href="#ref-1" className="text-blue-600 hover:underline">[1]</a>.</li>
              <li>Integrate with OpenTelemetry and Prometheus exporters to ensure that discovered signals are captured and stored in a standardized manner.</li>
              <li>Employ supervised machine learning models to predict which KPIs are necessary for newly deployed services, thus reducing manual configuration efforts <a href="#ref-1" className="text-blue-600 hover:underline">[1]</a>.</li>
            </ul>

            <h2 className="text-[24px] font-semibold text-black mb-4">
              2. Log Structuring & Enrichment Agent
            </h2>
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              The methodology for the Log Structuring & Enrichment Agent (LSEA) focuses on transforming unstructured logs into meaningful, structured data streams that are easy to analyze <a href="#ref-3" className="text-blue-600 hover:underline">[3]</a>. To accomplish this, the LSEA will:
            </p>
            <ul className="list-disc list-inside text-black/70 space-y-2 text-[14px]">
              <li>Use advanced log parsing techniques <a href="#ref-3" className="text-blue-600 hover:underline">[3]</a>, such as semantic classification with Large Language Models (LLMs), to ensure that logs are categorized by their semantic intent (e.g., state transitions, error events) <a href="#ref-2" className="text-blue-600 hover:underline">[2]</a>.</li>
              <li>Integrate with existing log management systems such as OpenTelemetry and Elasticsearch to enrich logs with necessary metadata like trace IDs and user session identifiers <a href="#ref-4" className="text-blue-600 hover:underline">[4]</a>.</li>
              <li>Incorporate a privacy-preserving mechanism (Privacy Guard) to automatically redact personally identifiable information (PII) from logs, ensuring compliance with regulations like GDPR.</li>
              <li>Implement a neural parsing model (e.g., UniParser or LogBERT) to understand and classify logs in real-time, making logs contextually rich and ready for cross-service debugging <a href="#ref-2" className="text-blue-600 hover:underline">[2]</a>.</li>
            </ul>

            <h2 className="text-[24px] font-semibold text-black mb-4">
              3. Adaptive Alert Tuning Agent
            </h2>
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              The methodology for the Adaptive Alert Tuning Agent (AATA) revolves around reducing alert fatigue by dynamically adjusting alert thresholds based on real-time system behavior and operator feedback <a href="#ref-1" className="text-blue-600 hover:underline">[1]</a>. The approach will involve:
            </p>
            <ul className="list-disc list-inside text-black/70 space-y-2 text-[14px]">
              <li>Developing a feedback loop that adjusts alerting thresholds based on the false positive rates observed from previous alerts and operator responses <a href="#ref-1" className="text-blue-600 hover:underline">[1]</a>.</li>
              <li>Implementing machine learning models (e.g., statistical forecasting, ensemble methods) to predict alert levels and determine the urgency of alerts, ensuring that operators only receive notifications when necessary.</li>
              <li>Incorporating a self-healing mechanism that allows the system to learn from historical incident data and continuously optimize alert thresholds to reduce noise and increase alert relevance <a href="#ref-1" className="text-blue-600 hover:underline">[1]</a>.</li>
              <li>Using feature extraction techniques to identify seasonal patterns and change points, ensuring that alert thresholds evolve with the system’s workload patterns.</li>
            </ul>

            <h2 className="text-[24px] font-semibold text-black mb-4">
              4. Anomaly Detection & Insight Agent
            </h2>
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              The methodology for the Anomaly Detection & Insight Agent (ADIIA) aims to correlate anomalies across multiple telemetry sources (logs, metrics, and traces) and generate coherent incident stories <a href="#ref-4" className="text-blue-600 hover:underline">[4]</a><a href="#ref-5" className="text-blue-600 hover:underline">[5]</a>. The steps involved in this process include:
            </p>
            <ul className="list-disc list-inside text-black/70 space-y-2 text-[14px]">
              <li>Developing machine learning models like Isolation Forest and Random Forest to identify and classify anomalies within telemetry data <a href="#ref-2" className="text-blue-600 hover:underline">[2]</a>.</li>
              <li>Correlating anomalies across logs, metrics, and traces to understand the broader impact of incidents and to provide a cohesive view of the system state <a href="#ref-5" className="text-blue-600 hover:underline">[5]</a>.</li>
              <li>Using the Random Forest-based scoring mechanism to rank incident causes and provide root cause analysis, allowing the system to generate a narrative of what happened during an anomaly <a href="#ref-4" className="text-blue-600 hover:underline">[4]</a>.</li>
              <li>Creating a framework for incident story generation that provides operators with a structured report that explains the cause, timeline, and cascading effects of a system failure <a href="#ref-5" className="text-blue-600 hover:underline">[5]</a>.</li>
            </ul>

            <h2 className="text-[24px] font-semibold text-black mb-4">
              Performance Evaluation
            </h2>
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              The methodology will include comprehensive performance evaluations across key metrics like false positive reduction, anomaly detection accuracy, system scalability, and operational efficiency. The evaluation will include:
            </p>
            <ul className="list-disc list-inside text-black/70 space-y-2 text-[14px]">
              <li>Assessing the effectiveness of the Metric & Signal Discovery Agent in identifying missing KPIs during system updates <a href="#ref-1" className="text-blue-600 hover:underline">[1]</a>.</li>
              <li>Measuring the accuracy and efficiency of the Log Structuring & Enrichment Agent in transforming unstructured logs into actionable insights <a href="#ref-3" className="text-blue-600 hover:underline">[3]</a>.</li>
              <li>Evaluating the reduction in alert fatigue and false positives using the Adaptive Alert Tuning Agent and comparing it against traditional static thresholding systems <a href="#ref-1" className="text-blue-600 hover:underline">[1]</a>.</li>
              <li>Testing the Anomaly Detection & Insight Agent’s ability to correlate multi-source telemetry data and generate meaningful incident narratives <a href="#ref-4" className="text-blue-600 hover:underline">[4]</a><a href="#ref-5" className="text-blue-600 hover:underline">[5]</a>.</li>
            </ul>

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