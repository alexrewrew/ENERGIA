<?php
function mime_header_encode ($str, $data_charset = '', $send_charset = '')
{
    if ($data_charset != $send_charset) {
        $str = iconv ($data_charset, $send_charset, $str);
    }
    return '=?' . $send_charset . '?B?' . base64_encode ($str) . '?=';
}


function send_mime_mail ($name_from, $email_from, $name_to, $email_to, $data_charset, $send_charset, $subject, $body)
{
    $to = mime_header_encode ($name_to, $data_charset, $send_charset) . ' <' . $email_to . '>';
    $subject = mime_header_encode ($subject, $data_charset, $send_charset);
    $from = mime_header_encode ($name_from, $data_charset, $send_charset) . ' <' . $email_from . '>';
    if ($data_charset != $send_charset) {
        $body = iconv ($data_charset, $send_charset, $body);
    }
    $headers = "From: $from\r\n";
    $headers .= "Content-type: text/html; charset=$send_charset\r\n";
    return mail ($to, $subject, $body, $headers);
}

if (!empty($_POST)) {
    $arUsers = array(
        array(
            "NAME" => "ENERGIA",
            "EMAIL" => "info@energia.ltd" //change email here
        )
    );

    $message = '<b>Ім\'я:</b>' . $_POST['name'] . '<br/>';
    $message .= '<b>E-mail:</b>' . $_POST['email'] . '<br/><br/>';
    $message .= '<b>Текст повідомлення:</b><br/>' . nl2br ($_POST['text']);

    foreach ($arUsers as $Item) {
        $r = send_mime_mail ($_POST['name'], $_POST['email'], $Item['NAME'], $Item['EMAIL'], 'utf-8', 'utf-8', "Повідомлення з сайту energia.ltd", $message);
    }
}
?>
