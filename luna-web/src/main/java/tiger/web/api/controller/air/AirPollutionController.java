package tiger.web.api.controller.air;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import tiger.biz.air.support.AirPollutionManager;
import tiger.common.dal.annotation.LoginRequired;
import tiger.core.basic.BaseResult;
import tiger.core.domain.air.AirPollutionDomain;
import tiger.core.domain.message.MessageDomain;
import tiger.web.api.constants.APIConstants;
import tiger.web.api.form.air.AirPollutionUpdateForm;
import tiger.web.api.form.message.MessageUpdateForm;

import javax.validation.Valid;


/**
 * Created by lisite on 16/5/21.
 *
 * @author lisite
 * @version v0.1.2
 */
@RestController
@ResponseBody
@RequestMapping(APIConstants.BASE_API_URL + "/environment/air")
public class AirPollutionController {
    @Autowired
    private AirPollutionManager airPollutionManager;

    /**
     * 根据id获取AirPollutionDomain
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/air_pollution/{id}", method = RequestMethod.GET)
    @ResponseBody
    public BaseResult<AirPollutionDomain> getAirPollutionById(@PathVariable("id") Long id){
        AirPollutionDomain a=airPollutionManager.read(id).getData();
        System.out.println(a + "123");
        return  airPollutionManager.read(id);
    }

    /**
     * 删除AirPollutionDomain
     *
     * @param id the id
     * @return the base result
     */
    @RequestMapping(value = "air_pollution/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public BaseResult<Boolean> deleteAirPollutionById(@PathVariable("id") Long id) {
        return airPollutionManager.delete(id);
    }

    /**
     * 更新AirPollutionDomain
     *
     * @param airPollutionForm   the airPollution form
     * @param bindingResult the binding result
     * @param id            the id
     * @return the base result
     */
    @RequestMapping(value = "air_pollution/{id}", method = RequestMethod.PUT)
    @ResponseBody
    @LoginRequired
    public BaseResult<Boolean> updateAirPollutionById(@RequestBody @Valid AirPollutionUpdateForm airPollutionForm,
                                                       BindingResult bindingResult,
                                                       @PathVariable("id") long id) {
        AirPollutionDomain airPollutionDomain = airPollutionForm.convert2Domain();
        airPollutionDomain.setId(id);

        return airPollutionManager.update(airPollutionDomain);
    }

}
