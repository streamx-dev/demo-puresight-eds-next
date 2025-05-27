package dev.streamx.puresight.eds;

import dev.streamx.clients.ingestion.StreamxClient;
import dev.streamx.clients.ingestion.impl.utils.StringUtils;
import dev.streamx.clients.ingestion.publisher.Message;
import dev.streamx.clients.ingestion.publisher.Publisher;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import org.jetbrains.annotations.Nullable;

public class PublishToStreamx {

  public static void main(String[] args) throws Exception {
    String pagePath = args[0];
    String edsDomainUrl = System.getenv("EDS_DOMAIN_URL");
    String streamxIngestionBaseUrl = System.getenv("STREAMX_INGESTION_BASE_URL");
    String authToken = System.getenv("STREAMX_TOKEN");

    String edsPageUrl = edsDomainUrl + pagePath;
    System.out.println("Page URL: " + edsPageUrl);

    String pageHtml = fetchPageHtml(edsPageUrl);
    if (pageHtml == null) {
      System.err.println("Cannot fetch page from EDS.");
      System.exit(1);
    }

    boolean success = publishPageToStreamx(streamxIngestionBaseUrl, authToken, pagePath, pageHtml);
    if (!success) {
      System.err.println("Publishing to StreamX failed.");
      System.exit(1);
    }

    System.out.println("Page published successfully.");
  }

  @Nullable
  private static String fetchPageHtml(String url) throws Exception {
    try (HttpClient client = HttpClient.newHttpClient()) {
      HttpRequest request = HttpRequest.newBuilder(URI.create(url)).GET().build();
      HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

      int statusCode = response.statusCode();
      System.out.println("Status code: " + statusCode);

      return statusCode == 200 ? response.body() : null;
    }
  }

  static class Content {

    public String bytes;

    public Content() {

    }

    public Content(String bytes) {
      this.bytes = bytes;
    }

    public String getBytes() {
      return bytes;
    }
  }


  static class Page {

    public Content content;

    public Page() {

    }

    public Page(Content content) {
      this.content = content;
    }

    public Content getContent() {
      return content;
    }
  }


  private static boolean publishPageToStreamx(String streamxIngestionBaseUrl, @Nullable String authToken, String key, String content) throws Exception {
    StreamxClient streamxClient = StreamxClient.builder(streamxIngestionBaseUrl)
        .setAuthToken(StringUtils.isBlank(authToken) ? null : authToken)
        .build();

    Message<Page> messageToSend = Message.newPublishMessage(key, new Page(new Content(content)))
        .withEventTime(null)
        .withProperty("sx:type", "page/blog")
        .build();

    try (streamxClient) {
      Publisher<Page> publisher = streamxClient.newPublisher("pages", Page.class);
      publisher.sendMessage(messageToSend);
      return true;
    } catch (Exception ex) {
      System.err.println("Error publishing to StreamX");
      ex.printStackTrace();
      return false;
    }
  }
}
