import voucherService from "../../src/services/voucherService";
import voucherRepository from "../../src/repositories/voucherRepository";

describe("Testes unitarios do voucher service", () => {
  it("Deve criar um service", async () => {
    const newVoucher = {
      code: "aaaa",
      discount: 10,
    };

    // se houver return tem que mockar o retorno dentro do mockImplementation
    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(voucherRepository, "createVoucher")
      .mockImplementationOnce((): any => {});

    await voucherService.createVoucher(newVoucher.code, newVoucher.discount);

    expect(voucherRepository.getVoucherByCode).toBeCalled();
    expect(voucherRepository.createVoucher).toBeCalled();
  });

  it("n deve criar voucher duplicado no service", async () => {
    const newVoucher = {
      code: "aaaa",
      discount: 10,
    };

    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockImplementationOnce((): any => {
        return {
          code: "aaaa",
          discount: 10,
        };
      });

    const promise = voucherService.createVoucher("aaa", 10);

    expect(promise).rejects.toEqual({
      type: "conflict",
      message: "Voucher already exist.",
    });
  });
});
