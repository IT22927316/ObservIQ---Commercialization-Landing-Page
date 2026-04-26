import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ResearchObjectives() {
  return (
    <main className="min-h-screen bg-[#fafaf7] text-[#111111]">
      <Navbar />
      <Container>
        <div className="py-20">
          <h1 className="max-w-3xl text-[34px] font-semibold leading-[1.02] tracking-[-0.045em] text-black sm:text-[42px] lg:text-[56px] mb-8">
            Research Objectives
          </h1>

          <div className="space-y-8">
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              The primary objective of this research is to design and implement a Smart Observability Middleware that enhances the monitoring and reliability of microservice-based systems. This solution is based on four autonomous agents, each addressing a unique aspect of observability challenges faced by modern distributed systems.
            </p>

            <h2 className="text-[24px] font-semibold text-black mb-4">
              1. Metric & Signal Discovery Agent
            </h2>
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              The objective of the Metric & Signal Discovery Agent (MSDA) is to automate the identification and collection of essential telemetry signals across the microservices landscape. This agent will dynamically discover and configure KPIs (Key Performance Indicators) by analyzing both application source code and runtime behavior. The goal is to ensure that no critical metrics are missed, even as services and APIs evolve. The MSDA will also include a route-intent classification module, which maps API routes to semantic categories, ensuring that each API route’s operational purpose is captured and monitored in real-time.
            </p>

            <h2 className="text-[24px] font-semibold text-black mb-4">
              2. Log Structuring & Enrichment Agent
            </h2>
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              The Log Structuring & Enrichment Agent (LSEA) aims to transform unstructured logs into meaningful, structured data streams. This agent will employ machine learning techniques, such as semantic log classification and privacy-preserving data redaction, to ensure logs are both readable and compliant with data protection regulations (e.g., GDPR). The goal is to enhance log usability by providing contextual metadata (e.g., trace IDs, session information) that will enable efficient cross-service debugging and incident analysis.
            </p>

            <h2 className="text-[24px] font-semibold text-black mb-4">
              3. Adaptive Alert Tuning Agent
            </h2>
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              The objective of the Adaptive Alert Tuning Agent (AATA) is to reduce alert fatigue by adapting alert thresholds based on real-time system behavior and historical feedback. Unlike static thresholds, which often result in false positives, AATA will continuously refine alert configurations based on operator feedback and system performance. By incorporating a self-healing feedback loop, the AATA will ensure that alerts remain relevant, timely, and actionable. This feedback loop will be integrated into the observability pipeline, enabling autonomous adaptation to changes in workload or system conditions.
            </p>

            <h2 className="text-[24px] font-semibold text-black mb-4">
              4. Anomaly Detection & Insight Agent
            </h2>
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              The Anomaly Detection & Insight Agent (ADIIA) is designed to provide a more context-rich approach to anomaly detection by correlating data across multiple telemetry streams, including logs, metrics, and traces. Unlike traditional models that treat each anomaly independently, ADIIA will integrate information from various sources to generate a cohesive incident story that explains the root cause and cascading effects of system failures. The agent will employ machine learning techniques, such as Random Forest and Isolation Forest, to identify patterns and provide actionable insights to operators, thus improving the speed and accuracy of incident resolution.
            </p>

            <h2 className="text-[24px] font-semibold text-black mb-4">
              5. Performance Evaluation and Validation
            </h2>
            <p className="w-full text-[14px] leading-7 text-black/70 mb-6">
              The final objective is to evaluate the performance of the integrated middleware in experimental environments. This includes measuring improvements in false positive reduction, anomaly detection accuracy, log processing latency, and the reduction in mean time to detection (MTTD) and resolution (MTTR). Through these evaluations, the middleware’s impact on overall system reliability and performance will be assessed, providing insights into its effectiveness and scalability across different workloads.
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