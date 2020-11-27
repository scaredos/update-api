import time
import net.http

fn main() {
  masterurl := ''
  masterkey := ''
  
  method := http.method_from_str('GET')
  mut req := http.new_request(method, masterurl, '')?
  req.add_header('Authorization', masterkey)
  
  resp := req.do()?
  
  if resp.status_code != 200 {
    println("Error making the request")
  }
  
  time.sleep_ms(86400000000000)
}
