package ter.behome.microservice_authentification.openfeign;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import feign.RequestInterceptor;
import feign.RequestTemplate;


@Component
public class FeignClientInterceptor implements RequestInterceptor {

    private static final String AUTHORIZATION_HEADER = "Authorization";

    private String getBearerTokenHeader() {
        RequestAttributes attributes = RequestContextHolder.getRequestAttributes();
        if (attributes instanceof ServletRequestAttributes) {
            HttpServletRequest request = ((ServletRequestAttributes) attributes).getRequest();
            if (request != null) {
                return request.getHeader("Authorization");
            }
        }
        return null;
    }

    @Override
    public void apply(RequestTemplate requestTemplate) {
        String token = getBearerTokenHeader();
        if (token != null && !token.isEmpty()) {
            requestTemplate.header(AUTHORIZATION_HEADER, token);
        }
    }
}


