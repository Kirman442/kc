import { siteUrl } from "./site-paths.js";import React from 'react';
import Code from './CodeBlock.jsx';
import MapEmbed from './MapEmbed.jsx';
import { AppendixProvider, AppendixLink, TechnicalAppendix, AppendixSection } from './TechnicalAppendix.jsx';
import './full-article.css';

const originalCode = 'https://github.com/Kirman442/mobile-network-map/tree/c45c2e86145b8409efae4f45388d39444a0d8c05';
const currentCode = 'https://github.com/Kirman442/mobile-network-map/tree/production';
const ipcExample = `const bytes = new Uint8Array(await response.arrayBuffer());
const table = tableFromIPC(bytes);
const chunks = extractChunks(table);

// Keep views into the received IPC buffer.
if (!chunks.every(chunk => chunk.src.buffer === bytes.buffer)) {
  throw new Error('Arrow numeric buffer was copied.');
}`;
const transferExample = `const buffers = [...new Set(chunks.map(chunk => chunk.src.buffer))];
self.postMessage({ chunks }, buffers);
// The sender's transferred ArrayBuffers are now detached.
// Their numeric data is available to the receiving thread.`;
const layerExample = `new ScatterplotLayer({
  id: 'speed-' + chunk.id,
  data: {
    length: chunk.length,
    attributes: {
      getPosition: { value: chunk.src, size: 2, stride: 24 },
      getFillColor: { value: colors, size: 4, normalized: true }
    }
  },
  pickable: tooltipEnabled
});`;

function Text({ children }) {
  return <p className="text-medium text-dark-gray line-height-28 sm-line-height-26">{children}</p>;
}
function ExternalLink({ href, children }) {
  if (href === 'https://kirman442.github.io/gis/portfolio/Accidents') return <a className="text-decoration-underline" href={siteUrl("/projects/accidents")}>{children}</a>;
  return <a className="text-decoration-underline" href={siteUrl(href)} target="_blank" rel="noopener noreferrer">{children}</a>;
}
function Comparison({ caption, headers, rows }) {
  return <div className="mobile-network-table-scroll" role="region" aria-label={caption} tabIndex={0}>
        <table className="mobile-network-table">
            <caption>{caption}</caption>
            <thead><tr>{headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr></thead>
            <tbody>{rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ?
          <th scope="row" key={index}>{cell}</th> :
          <td key={index}>{cell}</td>)}</tr>)}</tbody>
        </table>
    </div>;
}
function ResourceList({ items }) {
  return <dl className="mobile-network-resources text-medium text-dark-gray">
        {items.map(({ name, description, href }) => <div className="mobile-network-resource" key={name}>
            <dt className="datenquelle">{href ? <ExternalLink href={siteUrl(href)}>{name} ↗</ExternalLink> : name}</dt>
            <dd>{description}</dd>
        </div>)}
    </dl>;
}
const projectTools = [
{ name: 'Apache Arrow JavaScript', description: 'Reads Arrow IPC and exposes the numeric data as TypedArray views.', href: 'https://arrow.apache.org/js/current/' },
{ name: 'deck.gl', description: 'Renders the point and record-density layers with WebGL.', href: 'https://deck.gl/' },
{ name: 'MapLibre GL JS', description: 'Displays and styles the interactive vector basemap.', href: 'https://maplibre.org/maplibre-gl-js/docs/' },
{ name: '@vis.gl/react-maplibre', description: 'Integrates MapLibre with the React interface.', href: 'https://visgl.github.io/react-maplibre/' },
{ name: 'React', description: 'Manages the interface, controls and application state.', href: 'https://react.dev/' },
{ name: 'd3-scale', description: 'Interpolates colours along the download-speed scale.', href: 'https://d3js.org/d3-scale' },
{ name: 'Web Workers and TypedArrays', description: 'Prepare numeric buffers and palettes outside the main thread.', href: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API' },
{ name: 'Brotli and gzip', description: 'Compress the prepared Arrow files for HTTP delivery.' },
{ name: 'Vite', description: 'Builds the application and supports local development.', href: 'https://vite.dev/' },
{ name: 'Netlify', description: 'Hosts the application; Edge Functions set data-delivery and cache headers.', href: 'https://docs.netlify.com/build/edge-functions/overview/' },
{ name: 'parquet-wasm (previous version)', description: 'Decoded Parquet through WebAssembly in the original browser pipeline.', href: 'https://kylebarron.dev/parquet-wasm/' }];


const documentation = [
{ name: 'Apache Arrow', description: 'Numeric buffer layout and the IPC format.', href: 'https://arrow.apache.org/docs/format/Columnar.html' },
{ name: 'Apache Arrow JavaScript', description: 'JavaScript API for tables, vectors and IPC readers.', href: 'https://arrow.apache.org/js/current/' },
{ name: 'deck.gl', description: <><ExternalLink href={siteUrl("https://deck.gl/docs/developer-guide/performance#use-binary-data")}>Binary data and performance</ExternalLink> · <ExternalLink href={siteUrl("https://deck.gl/docs/api-reference/layers/scatterplot-layer")}>ScatterplotLayer</ExternalLink></> },
{ name: 'MDN: hardware concurrency', description: 'Browser-reported logical processors and the limits of using that value to size a worker pool.', href: 'https://developer.mozilla.org/en-US/docs/Web/API/Navigator/hardwareConcurrency' },
{ name: 'MDN: transferable objects', description: 'Buffer ownership transfer and detachment of the sender’s ArrayBuffer.', href: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects' },
{ name: 'Ookla Open Data', description: 'Source of mobile network performance aggregated into tiles.', href: 'https://github.com/teamookla/ookla-open-data' },
{ name: 'Netlify Edge Functions API', description: 'Request and response handling, including conditional requests.', href: 'https://docs.netlify.com/build/edge-functions/api/#use-conditional-request' },
{ name: 'GeoJSON', description: 'RFC 7946: the standard for geographic features encoded as JSON.', href: 'https://datatracker.ietf.org/doc/html/rfc7946' },
{ name: 'GeoPackage', description: 'Capabilities of the SQLite container for geographic data.', href: 'https://www.geopackage.org/' },
{ name: 'Leaflet', description: 'GeoJSON layers and SVG or Canvas rendering.', href: 'https://leafletjs.com/reference.html' },
{ name: 'OpenLayers', description: 'Example of a WebGL point layer.', href: 'https://openlayers.org/en/latest/examples/webgl-points-layer.html' },
{ name: 'MapLibre', description: 'Vector and raster map sources.', href: 'https://maplibre.org/maplibre-style-spec/sources/' },
{ name: 'CARTO', description: 'Dark Matter basemap style with a vector source, used by this project.', href: 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json' },
{ name: 'GeoArrow', description: 'Standard geometry representations in Apache Arrow.', href: 'https://geoarrow.org/' },
{ name: 'MDN: cross-origin isolation', description: 'Page isolation and the requirements for SharedArrayBuffer.', href: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/crossOriginIsolated' },
{ name: 'Kyle Barron', description: 'Zero-copy Apache Arrow with WebAssembly.', href: 'https://observablehq.com/@kylebarron/zero-copy-apache-arrow-with-webassembly' },
{ name: 'Kyle Barron: GeoParquet', description: 'GeoParquet on the Web: browser decoding and visualization.', href: 'https://observablehq.com/@kylebarron/geoparquet-on-the-web' },
{ name: 'Kyle Barron: GeoArrow', description: 'GeoArrow and GeoParquet in deck.gl, including the Ookla map example.', href: 'https://observablehq.com/@kylebarron/geoarrow-and-geoparquet-in-deck-gl' }];


const projectCredits = [
{ name: 'Kirill Lisochenko', description: 'Project author: concept, original application, data preparation, visual design, testing and final decisions.' },
{ name: 'OpenAI Codex', description: 'AI coding assistant: architecture analysis, Arrow/Parquet prototyping, implementation of optimizations and assistance with testing and documentation.' },
{ name: 'Kyle Barron', description: 'Technical inspiration through public articles and examples on Arrow, GeoParquet, WebAssembly and deck.gl.' },
{ name: 'Open-source maintainers', description: 'The Apache Arrow, vis.gl, MapLibre, React, D3 and Vite communities provide the libraries used by the application.' },
{ name: 'Data and basemap providers', description: 'Ookla supplies the aggregated performance data; CARTO supplies the basemap style, with OpenStreetMap contributors credited on the map.' }];


function TechnicalDetails({ title, children }) {
  return <details className="mobile-network-technical">
        <summary className="alt-font">{title}</summary>
        <div className="mobile-network-technical-content">{children}</div>
    </details>;
}
export default function FullArticle() {
  return <AppendixProvider><div className="mobile-network-article">
        <h2 id="story-start">Taking a larger dataset into the browser</h2>
        <Text>MobileNetwork grew out of my earlier experiments with interactive maps, including the <ExternalLink href={siteUrl("https://kirman442.github.io/gis/portfolio/Accidents")}>Accidents project</ExternalLink>. This time I wanted to work with a much larger collection of points and explore what it takes to make that data useful directly in a browser. Kyle Barron&apos;s articles on Arrow, GeoParquet and deck.gl gave me a starting point, including an example using Ookla data.</Text>
        <Text>The result is a map of mobile internet performance across <b>42 countries and 1,235,099 tile records</b>. React handles the interface, MapLibre GL displays the CARTO vector basemap, and deck.gl draws the points and the record-density layer. In the current version, the data reaches the browser as Apache Arrow IPC files compressed with Brotli.</Text>
        <Text>The first version already worked. Returning to it gave me an opportunity to look more closely at the work behind the map: downloading files, decoding them, moving arrays between threads and preparing colours. For this revision, I worked with OpenAI Codex on the analysis, a separate prototype and the implementation, then tested the results and chose which changes to keep.</Text>

        <h2 id="data-records">Understanding what the points represent</h2>
        <Text>I used <ExternalLink href={siteUrl("https://github.com/teamookla/ookla-open-data")}>Ookla Open Data</ExternalLink>, where mobile network measurements are aggregated into geographic tiles. That distinction matters when reading the map: each point represents a tile record, not an individual Speedtest measurement. The tiles are defined at zoom level 16, approximately 610.8 metres wide at the equator, with ground dimensions changing with latitude.</Text>
        <Text>For the application, I prepared six values per record: longitude, latitude, ID, average download, average upload and country code. Keeping this layout made it possible to compare the old and new delivery formats using the same numerical data. The prepared files do not identify their source period, separate operators or distinguish 4G from 5G, so I treat the map as a visualization of the available performance records. An empty area alone does not establish that mobile coverage is missing.</Text>

        <h2 id="delivery">Finding a simpler route from file to map</h2>
        <Text>The original version downloaded Parquet files and decoded them through WebAssembly. Workers handled downloading and some preparation, but the Parquet decoder and the conversion to Arrow IPC ran in the main thread. The data then returned to a worker for another preparation step before reaching the map. Looking at that sequence helped explain why using workers did not, by itself, move all the processing away from the interface.</Text>
        <Text>Since the country files are prepared before deployment, I could do the conversion once during data preparation and deliver Arrow IPC directly. Before changing the working application, I tested that approach in a separate prototype, first with Belgium and then with the full collection of countries. This made it possible to compare file sizes, processing and the appearance of the map without experimenting inside the production version.</Text>
        <Text>There was a trade-off: uncompressed Arrow files were larger than Parquet. Brotli changed the delivery side of the comparison. For the same prototype dataset, compressed Arrow bodies totalled about <b>14.21 MB, compared with 21.66 MB for Parquet</b>. The combination offered a useful balance: less data to transfer and a simpler browser pipeline, with no runtime Parquet decoding or Parquet-to-IPC conversion.</Text>
        <AppendixLink target="appendix-note-1" origin="article-note-1">File sizes and HTTP delivery</AppendixLink>

        <h2 id="loading">Letting countries arrive without rebuilding the whole dataset</h2>
        <Text>I also changed how the application handles countries as they become ready. A small pool of workers downloads the files, reads the IPC, checks the data and prepares the selected colour palette. Ready buffers are transferred to the main thread, where each chunk keeps its own point layer. The map can fill progressively, without repeatedly joining everything into a new, larger numerical array.</Text>
        <Text>For the point layer, I chose <b>binary ScatterplotLayer attributes</b>. The old version used callbacks to obtain coordinates and calculate colours. Now the layer receives the coordinate array and prepared colour array directly. This gives deck.gl less attribute preparation to do when data arrives, while keeping the original numerical buffers available for the map.</Text>
        <Text>Each country file is still downloaded completely before its records are read. This is progressive loading across countries; it does not stream points from an unfinished response or request only the area currently visible on screen. React, MapLibre and deck.gl also continue to perform interface and rendering work in the main thread.</Text>
        <AppendixLink target="appendix-note-2" origin="article-note-2">The current loading sequence and binary attributes</AppendixLink>

        <h2 id="zero-copy">Being precise about zero-copy</h2>
        <Text>Zero-copy was one of the ideas that attracted me to Arrow. Reviewing the implementation made me more careful about what that term means here. The useful result is quite specific: <b>the original six-field numerical payload can be read and transferred without repacking it into another numerical array</b>. The Float32 views point into the received, HTTP-decompressed IPC buffer, and the point layer uses those views for its positions.</Text>
        <Text>That does not make the entire journey from network to screen zero-copy. Colours need new arrays, I deliberately copy download values for the background palettes, and HTTP decompression and GPU uploads still involve their own work. I kept these compromises because they support the map&apos;s actual needs: straightforward loading, reusable data and quick palette changes.</Text>
        <AppendixLink target="appendix-note-3" origin="article-note-3">Buffer views, ownership transfer and code examples</AppendixLink>
        <AppendixLink target="appendix-note-4" origin="article-note-4">Why I did not add FFI, GeoArrow or shared memory</AppendixLink>

        <h2 id="colours">Making the colours useful</h2>
        <Text>Once loading was working, I returned to how the map looked. A very wide speed scale compressed much of the colour variation into a small part of the palette. I tried lower upper limits and settled on <b>150 Mbps</b>, with stops at 0, 25, 50, 75, 100 and 150 Mbps and smooth interpolation between them. Values above 150 share the final colour, while their original download and upload values remain available through an optional tooltip.</Text>
        <Text>I also wanted palette switching to stay convenient. During loading, workers calculate only the selected palette. After the loaded map has rendered, a background worker prepares the other three. If a visitor requests one before it is ready, that palette takes priority; the map keeps its previous colours and matching legend until the replacement is ready across the dataset.</Text>
        <Text>The density view answers a different question. It shows the relative concentration of tile records in the current view. A brighter area does not necessarily have faster internet, more underlying Speedtest measurements or better coverage. The tooltip is off by default and enables point picking when switched on.</Text>
        <AppendixLink target="appendix-note-5" origin="article-note-5">Palette scheduling and its memory cost</AppendixLink>

        <h2 id="workers">Testing whether more workers would help</h2>
        <Text>It was tempting to increase the loading pool as well. I tested fixed pools of four and eight workers in a separate preview, then repeated the comparison with alternating runs. Eight could be faster in an individual run, but it did not give a consistent improvement on my LTE connection. Both settings loaded the complete dataset successfully.</Text>
        <Text>I kept the production maximum at <b>four loading workers</b>. It is a practical balance for the current build, and the actual pool can be smaller depending on the processor count reported by the browser. I have kept the test version for later comparisons on a different computer and a faster connection; those conditions could change the result.</Text>
        <AppendixLink target="appendix-note-6" origin="article-note-6">Worker limits and the alternating test results</AppendixLink>

        <h2 id="findings">What I learned from the revision</h2>
        <Text>The clearest improvement was the reduction in data transferred and the removal of browser work that could be done in advance. In one comparison series with caching disabled, total page traffic fell from about <b>26.9 MB to 17.6 MB</b>. Loading times were less predictable: my LTE connection varied enough that a single faster run would have been a poor basis for choosing the architecture.</Text>
        <Text>The revision also changed how I describe the project. It is easier to explain the benefits when I can point to a specific conversion removed, a buffer reused or a task moved into a worker. The map still downloads all countries, retains extra colour arrays and uploads data to the GPU. Those are the current trade-offs, and there is room for further measurement on other devices.</Text>
        <Text>For now, the result brings the original idea closer to what I wanted: a large collection of mobile performance data that can be explored in a browser, with a loading pipeline I can explain and test. Parquet remains useful in data preparation; the published map receives prepared Arrow files and spends more of its work on reading and displaying them.</Text>
        <AppendixLink target="appendix-note-7" origin="article-note-7">Whole-page loading observations and caching</AppendixLink>
        <AppendixLink target="appendix-note-8" origin="article-note-8">How this approach relates to other GIS formats and map libraries</AppendixLink>
        <Text><ExternalLink href={siteUrl(currentCode)}>Current source code</ExternalLink> · <ExternalLink href={siteUrl("https://mobile-network-map.netlify.app/")}>Open the current map</ExternalLink></Text>


        <details className="mobile-network-history" id="previous-version">
            <summary className="alt-font">Previous version: Parquet + WASM</summary>
            <div className="mobile-network-history-content">
                <Text><b>Historical implementation.</b> This corrected description refers to the original code preserved in <ExternalLink href={siteUrl(originalCode)}>this commit on main</ExternalLink>. The application below shows the current Arrow version.</Text>
                <h3>The original processing pipeline</h3>
                <Text>The first version combined Parquet, parquet-wasm, Apache Arrow, Web Workers, Float32Array and deck.gl. Workers downloaded complete country files through Fetch API. A Uint8Array view exposed the received ArrayBuffer without copying its bytes, and WASM_REQUEST transferred it to the main thread.</Text>
                <Text>WASM initialization, readParquet and intoIPCStream ran in the <b>main thread</b>. readParquet produced an Arrow table in WASM memory; intoIPCStream then serialized that table into IPC. An async JavaScript wrapper did not move these synchronous operations into a worker.</Text>
                <Text>WASM_RESPONSE transferred the IPC back to the worker, where tableFromIPC read it. The worker extracted the first record batch, checked stride, allocated a new Float32Array and copied six values per record into it. FINAL_RESULT transferred that array to the main thread. taskId and taskDataStore connected the message stages.</Text>
                <Text>The component created a pool of ten workers and waited for groups of files before updating the map. It combined ready arrays using new Float32Array allocations and set calls. Countries could appear before the whole dataset finished, but records were not streamed from unfinished file responses.</Text>
                <h3>What the original optimizations did</h3>
                <Text>TypedArrays allowed indexed access without an application object for every point. Transfer lists moved buffer ownership between threads without duplicating the numerical bytes. These were useful optimizations, but the full pipeline included Parquet decoding, IPC serialization, worker-side copying, repeated concatenation and GPU attribute preparation.</Text>
                <Text>ScatterplotLayer used getPosition and getFillColor callbacks, rather than ready-made binary data.attributes. The selected D3 palette was calculated during attribute preparation; four complete palettes were not cached. The original colour calculation applied a multiplier of five to download, which was a display adjustment rather than a kbps-to-Mbps conversion.</Text>
                <h3>Capabilities and limits</h3>
                <Text>Parquet supports encodings, compression and readers capable of selective access. The original loader did not implement column selection, row-group skipping, range-based loading or within-file streaming. Its six-value layout was chosen by the project, not required by deck.gl. Coordinates alone did not establish GeoParquet or GeoArrow compliance.</Text>
                <Text>Workers moved some processing away from the interface, but main-thread WASM and merging remained potential bottlenecks. Claims about guaranteed smoothness, maximum CPU-cache efficiency or dramatic total-memory reductions require comparable measurements. The architecture demonstrated a practical large-data map, with specific benefits and explicit compromises.</Text>
            </div>
        </details>

        <h2 id="map">Explore the current map</h2>
        <Text>The embedded application uses the current Arrow + Brotli architecture.</Text>
        <MapEmbed />

        <h2 id="technical-appendix">Technical appendix</h2><TechnicalAppendix><AppendixSection id="appendix-note-1" title="File sizes and HTTP delivery">
            <Comparison caption="Data-file bodies for the same 42-country prototype dataset; decimal MB" headers={['Format', 'Transferred data', 'Relative to Parquet']} rows={[
          ['Parquet', '21.66 MB', 'Reference'],
          ['Arrow IPC, uncompressed', '29.68 MB', '+37.0%'],
          ['Arrow IPC + gzip', '15.49 MB', '-28.5%'],
          ['Arrow IPC + Brotli', '14.21 MB', '-34.4%']]
          } />
            <Text>These figures cover country data bodies, excluding JavaScript, CSS and basemap tiles. Files were compressed ahead of deployment with gzip level 6 and Brotli quality 5, without internal IPC compression. A Netlify Edge Function streams the stored file with the correct content type and Content-Encoding, and the browser handles HTTP decompression. The loader tries gzip if Brotli delivery or validation fails. Removing parquet-wasm also removes its initialization and its separate WASM memory from this browser pipeline.</Text>
        </AppendixSection>
        <AppendixSection id="appendix-note-2" title="The current loading sequence and binary attributes">
            <ol className="mobile-network-steps text-medium text-dark-gray">
                <li>One reusable loading pool processes one country task per worker at a time. Its size ranges from one to four.</li>
                <li>Each worker reads the complete IPC response, validates the data and retains Float32 views. It prepares the selected RGBA palette and copies download values into a compact array for later palette calculation.</li>
                <li>Numeric, colour and download buffers are transferred to the main thread. Ready chunks remain separate, and arriving results are grouped into interface updates before the next animation frame.</li>
                <li>After all country tasks finish, the loading pool terminates. Once the loaded chunks have been rendered, a separate worker prepares the remaining palettes and then terminates too.</li>
            </ol>
            <Text>The six fields are consecutive Float32 values, taking 24 bytes per record. They are packed into an Arrow <code>binary_data: List&lt;Float32&gt;</code> column. This layout is specific to the project; it is neither six separate Arrow columns nor a standard GeoArrow geometry representation. The loader checks schema metadata, counts, country codes, coordinates and speeds, and reads all record batches and list rows.</Text>
            <Text>ScatterplotLayer receives <code>data.length</code> and <code>data.attributes</code>. The position attribute reads the first two values of each record using a 24-byte stride; colours use four-component Uint8 arrays. This shortened example shows that arrangement:</Text>
            <Code code={layerExample} language="javascript" />
            <Text>A new chunk adds a layer without rewriting the already loaded numerical chunks. Data still has to be uploaded to GPU memory. The interleaved position buffer can include fields beyond the two coordinates, so avoiding CPU repacking does not automatically reduce GPU traffic or video memory.</Text>
            <Text>HeatmapLayer follows a different path: it uses a logical index across the chunks and retrieves coordinates through an accessor. It is outside the binary point-layer zero-copy path.</Text>
        </AppendixSection>
        <AppendixSection id="appendix-note-3" title="Buffer views, ownership transfer and code examples">
            <Text>Arrow JavaScript creates objects describing tables, fields and record batches. A TypedArray view is also an object, but creating that view does not duplicate the bytes it reads. The zero-copy claim concerns the original numerical payload, not every JavaScript allocation. The loader verifies that the views retain the received buffer:</Text>
            <Code code={ipcExample} language="javascript" />
            <Text>Passing an ArrayBuffer in a worker transfer list changes ownership without duplicating its numerical bytes. The sender&apos;s buffer becomes <b>detached</b>: its byteLength becomes zero, and the sender can no longer read those values through it. The receiver gains access to the transferred memory. This is ownership transfer, rather than two threads sharing the same mutable buffer.</Text>
            <Code code={transferExample} language="javascript" />
            <Text>These examples are shortened. The actual loader also checks responses, encodings, timeouts and dataset structure; the transfer includes the prepared colour and compact download buffers.</Text>
        </AppendixSection>
        <AppendixSection id="appendix-note-4" title="Why I did not add FFI, GeoArrow or shared memory">
            <Text>A <b>Foreign Function Interface (FFI)</b> is a bridge that lets code in one language or runtime use functions and data exposed by another. In a Parquet/WASM pipeline, an Arrow-compatible FFI bridge allows JavaScript to read decoded Arrow arrays directly from WebAssembly memory without first serializing them into IPC. In this version, IPC is prepared offline, so there is no browser Parquet-to-IPC transition left to remove.</Text>
            <Text>GeoArrow provides standard geometry representations and can improve interoperability, especially for lines and polygons. The current point layer only needs two coordinates from the agreed six-field layout. I kept that layout for this implementation.</Text>
            <Text>SharedArrayBuffer could let several threads read shared memory. However, the ordinary ArrayBuffer received from the network cannot simply become shared without copying its contents. Shared memory also needs careful access and lifetime management and cross-origin isolation, normally through COOP/COEP headers that affect external resources. For this map, a compact four-byte download copy per record was a simpler compromise. These alternatives would still leave colour calculation, HTTP decompression and ordinary WebGL uploads to perform.</Text>
        </AppendixSection>
        <AppendixSection id="appendix-note-5" title="Palette scheduling and its memory cost">
            <Text>The background worker calculates palettes in batches targeting roughly four milliseconds and yields between batches to handle messages. This is a scheduling target, not a frame-rate guarantee. Completed inactive palettes do not recreate layers. The worker releases its compact download input when it terminates.</Text>
            <Comparison caption="Numeric array payloads for 1,235,099 records; not peak application memory" headers={['Payload', 'Size']} rows={[
          ['Six Float32 fields per record', '29.64 MB'],
          ['One RGBA palette', '4.94 MB'],
          ['All four cached RGBA palettes', '19.76 MB'],
          ['Temporary download input for background calculation', '4.94 MB'],
          ['Numeric data plus four palettes after background completion', '49.40 MB']]
          } />
            <Text>These sizes exclude IPC metadata and padding, JavaScript objects, decompression buffers and GPU memory. The original version calculated the selected palette through a callback and did not store all four colour arrays. The new cache uses additional memory for fast switching. Preparing three palettes later reduces work before the first full frame, but does not reduce their eventual memory cost.</Text>
            <Text>The density layer uses unit weights and SUM aggregation over tile records. The speed palette uses actual Mbps, without the original display multiplier.</Text>
        </AppendixSection>
        <AppendixSection id="appendix-note-6" title="Worker limits and the alternating test results">
            <Text>The production formula uses the browser-reported logical processor count minus one, bounded between one and four, with a fallback of one worker if the count is unavailable. A reported count of four gives three loading workers; eight gives four. This heuristic aims to leave capacity for the interface, but it does not reserve a dedicated core. The browser may report fewer processors than the machine actually has. This cap concerns the data-loading pool, not all workers used by the map libraries.</Text>
            <Comparison caption="Five alternating LTE test pairs; medians" headers={['Measurement', '4 workers', '8 workers']} rows={[
          ['First points', '653 ms', '702 ms'],
          ['First full-dataset render callback', '5.49 s', '5.61 s'],
          ['Sum of worker preparation intervals', '518 ms', '647 ms']]
          } />
            <Text>Eight workers won two pairs and four won three. Preparation intervals are synchronous elapsed intervals summed across workers, not measurements of actual CPU utilization. The full-frame timing uses deck.gl&apos;s render callback, not GPU completion or the moment pixels reach the display. Measurements start at the loading effect, excluding some page startup work.</Text>
            <Text>The experiment forced exactly four or eight workers; it did not compare two adaptive policies. Other sizes were not evaluated systematically. More concurrent downloads share the available connection, while additional workers add startup work and compete for CPU time. The results support keeping the existing limit under the tested conditions, not declaring four universally optimal.</Text>
        </AppendixSection>
        <AppendixSection id="appendix-note-7" title="Whole-page loading observations and caching">
            <Text>In a series of three LTE comparisons with caching disabled, total page traffic averaged 17.63 MB for the new version versus 26.87 MB for the original. Network Finish averaged 13.94 s versus 17.21 s, and requests fell from 84 to 76. These whole-page observations include code and basemap resources; they do not isolate the effect of the data format. Finish is also different from the time at which all points have been drawn. Later runs ranged from 7.85 to 16.84 s as the connection varied.</Text>
            <Text>Production data caching allows storage with mandatory freshness validation through ETag. Rendering, density aggregation and GPU uploads can still be bottlenecks, and performance on physical phones needs separate measurement.</Text>
        </AppendixSection>
        <AppendixSection id="appendix-note-8" title="How this approach relates to other GIS formats and map libraries">
            <Text>GeoJSON and GeoPackage are data formats; Leaflet and OpenLayers are rendering libraries. GeoJSON is convenient for readable geometry exchange and straightforward integration. GeoPackage is a SQLite container suited to GIS, offline use and queries. I did not benchmark either format against this integrated map, so the Arrow/Parquet results are not a ranking of all GIS formats.</Text>
            <Text>Leaflet supports markers, GeoJSON and SVG or Canvas rendering, with plugins for other approaches. OpenLayers also offers WebGL layers. I used MapLibre and deck.gl for a styled WebGL basemap and direct binary visualization attributes. Other libraries have their own strengths and can also handle substantial datasets with suitable designs.</Text>
            <Text>A tiled map can be vector or raster. CARTO&apos;s vector tiles contain geometry styled by the browser, allowing flexible colours, labels and crisp rendering at the current scale. Raster tiles are pre-rendered images and are useful for imagery or static maps. Vector tiles are not always smaller or faster. Here the Ookla layer is separate from the tiled basemap and loads country Arrow files, rather than only visible tiles.</Text>
        </AppendixSection></TechnicalAppendix>
    </div></AppendixProvider>;
}

export function SourcesSection() {return <div className="mobile-network-article source-catalog" lang="en"><h2 id="sources">Sources and documentation</h2>
        <div className="resource-section"><div className="resource-heading"><span className="eyebrow">Reference index / 01</span><h3>Packages, libraries and services</h3></div>
        <ResourceList items={projectTools} /></div>
        <div className="resource-section credits-section"><div className="resource-heading"><span className="eyebrow">Contributions / 02</span><h3>Project credits</h3></div>
        <ResourceList items={projectCredits} /></div>
        <details className="mobile-network-documentation">
            <summary className="alt-font text-green">Documentation and background reading</summary>
            <section className="documentation-group"><h4>Data and basemaps</h4><ResourceList items={documentation.filter((item) => ["Ookla Open Data", "CARTO", "GeoJSON", "GeoPackage"].includes(item.name))} /></section>
      <section className="documentation-group"><h4>Arrow, geometry and memory</h4><ResourceList items={documentation.filter((item) => ["Apache Arrow", "Apache Arrow JavaScript", "GeoArrow", "MDN: transferable objects", "MDN: cross-origin isolation"].includes(item.name))} /></section>
      <section className="documentation-group"><h4>Rendering, workers and delivery</h4><ResourceList items={documentation.filter((item) => ["deck.gl", "MDN: hardware concurrency", "Netlify Edge Functions API", "Leaflet", "OpenLayers", "MapLibre"].includes(item.name))} /></section>
      <section className="documentation-group"><h4>Articles and inspiration</h4><ResourceList items={documentation.filter((item) => ["Kyle Barron", "Kyle Barron: GeoParquet", "Kyle Barron: GeoArrow"].includes(item.name))} /></section>
        </details>
  </div>;}
