import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Row,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

interface ForgetPasswordEmailProps {
  username?: string;
  number?: string | number;
  store_name?: string;
}

const ForgetPasswordEmailTemplate: React.FunctionComponent<ForgetPasswordEmailProps> = ({ username, number, store_name }) => {
  const resetPasswordLink = `http://localhost:3000/reset-password/${number}`;

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white text-right  my-auto  mx-auto font-sans px-2"
        style={{
          direction: "rtl",
        }}
        >
          <Container className="border border-solid border-gray-300 rounded my-10 mx-auto p-8 w-[55rem]">
           
            <Row>
              <Column>
                <Heading className="text-3xl font-bold text-gray-900">
                  مرحبًا، {username}
                </Heading>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text className="text-gray-900 mt-4">
                  لقد تلقينا طلبًا لإعادة تعيين كلمة المرور الخاصة بك. إذا لم تقم بهذا الطلب، يمكنك تجاهل هذا البريد الإلكتروني بأمان.
                </Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Link className="text-white bg-[#7300ff] rounded px-4 py-2 mt-2 inline-block" href={resetPasswordLink}>
                  إعادة تعيين كلمة المرور
                </Link>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text className="text-gray-600 text-sm">
                  يرجى تجاهل هذا البريد الإلكتروني إذا لم تطلب إعادة تعيين كلمة المرور.
                </Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text className="text-gray-900 font-semibold mt-4">شكرًا لك،</Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <span
                className="px-4 text-sm text-[#7300ff]  rounded-full mt-4 inline-block"
                >
                  {store_name}
                </span>
              </Column>
            </Row>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ForgetPasswordEmailTemplate;
