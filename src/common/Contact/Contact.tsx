import "./Contact.scss";

import { HomeOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Divider } from "antd";

function Contact() {
    return (
        <div className="contact">
            <h2 className="contact-title">Liên hệ</h2>
            <div className="contact-content">
                <div className="contact-item">
                    <MailOutlined style={{ fontSize: 25 }} />
                    <span className="contact-content-title">
                        <b>Email:</b> ismart@gmail.com
                    </span>
                </div>
                <Divider />
                <div className="contact-item">
                    <HomeOutlined style={{ fontSize: 25 }} />
                    <span className="contact-content-title">
                        <b>Địa chỉ:</b> Số 1, Đại Cồ Việt, Hai Bà Trưng, Hà Nội
                    </span>
                </div>
                <Divider />
                <div className="contact-item">
                    <PhoneOutlined style={{ fontSize: 25 }} />
                    <span className="contact-content-title">
                        <b>Số điện thoại:</b> 0123456789
                    </span>
                </div>
                <Divider />
                <iframe
                    title="google-map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.631019022368!2d105.83993977498018!3d21.007422880636508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab8a922653a9%3A0x6c2ec19683313eab!2zMSDEkOG6oWkgQ-G7kyBWaeG7h3QsIELDoWNoIEtob2EsIEhhaSBCw6AgVHLGsG5nLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1699550440346!5m2!1svi!2s"
                    style={{ border: 0, height: 450, width: "100%" }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
}

export default Contact;
